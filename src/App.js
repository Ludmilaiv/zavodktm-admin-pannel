import './App.scss';
import Header from './components/header';
import Content from './components/content';
import React, { useState, useEffect } from 'react';
import store from "./store";
import { connect } from "react-redux";
import data from "./data";
import axios from "axios";

window.addEventListener('storage', function (evt) {
  console.log(evt)
})

function App({offline=false, authError=false}) {

  const [isConfirm, setIsConfirm] = useState(false);
  const [role, setRole] = useState();
  const [userName, setUserName] = useState();
  const [isConfirmLoading, setIsConfirmLoading] = useState(true);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`); 
  }, []);

  useEffect(() => {
    if (authError) {
      localStorage.removeItem("admin");
      localStorage.removeItem("admintoken");
      document.location.reload();
    }
  }, [authError])

  let status = "author";
  let title = "Вход";

  if (localStorage.getItem("admin") && localStorage.getItem("admintoken") && !authError) {
    if (isConfirm) {
      if (!offline) {
        store.getState().funcGetDevices();
      }
      if (localStorage.getItem(localStorage.getItem("admin") + "defaultDevice")) {
        status = "deviceDetail";
        title = "Подождите..."
      } else {
        if (+role === 1) {
          status = "devices";
          title = "Мои устройства"
        } else if (+role === 2) {
          status = "adddevices";
          title = "Добавление ID устройства"
        }
      }
    } else {
      if (isConfirmLoading) {
        status = "loading";
        title = "Подождите...";
      } else {
        status = "confirm";
        title = "Подтверждение эл. почты";
      }
    } 
  } 

  const [activePage, setActivePage] = useState(status);
  const [pageTitle, setPageTitle] = useState(title);

  useEffect(() => {
    if (status === "author") {
      setRole(null);
      setUserName(null);
    }
  }, [status])

  useEffect(() => {
    let timeout;
    function getConfirm () {
      axios.post(data.getConfirmURL, {user_id: localStorage.getItem("admin")})
        .then(function (response) {
          if (+response.data === 1) {
            setIsConfirm(true);
            setIsConfirmLoading(false);
          } else if (+response.data === 0) {
            setIsConfirmLoading(false);
            setIsConfirm(false);
          }
        })

        timeout = setTimeout(getConfirm, 3000);
    }
    if (activePage === 'author' || (isConfirm && !isConfirmLoading)) return;
    if (localStorage.getItem("admin")) {
      getConfirm();
      return () => clearTimeout(timeout);
    }
  });

  useEffect(() => {
    axios.post(data.getUserInfoURL, {user_id: localStorage.getItem("admin"), token: localStorage.getItem('admintoken')})
      .then(function (response) {
        if (typeof response.data === "object") {
          setUserName(response.data['login']);
          setRole(response.data['role']);
        } 
      })
  })

  useEffect(() => {
    if (!isConfirm) {
      if (activePage === 'author' || activePage === 'reg' || activePage === 'authorHelp') return;
      if (isConfirmLoading) {
        if (activePage !== 'loading') {
          setActivePage("loading");
          setPageTitle("Подождите...");
        }
      } else if (activePage !== "confirm") {
        setActivePage("confirm");
        setPageTitle("Подтверждение эл. почты");
      }       
    } else {
      if (activePage === 'author') {
        setIsConfirmLoading(true);
        setIsConfirm(false);
        return;
      }
      if (activePage === 'loading' || activePage === "confirm") {
        if (!offline) {
          store.getState().funcGetDevices();
        }
        if (localStorage.getItem(localStorage.getItem("admin") + "defaultDevice")) {
          setActivePage("deviceDetail");
          setPageTitle("Подождите...");
        } else {
          if (+role === 1) {
            setActivePage("devices");
            setPageTitle("Мои устройства");
          } else if (+role === 2) {
            setActivePage("adddevices");
            setPageTitle("Добавление ID устройства");
          }
        }
      }
    }
  }, [isConfirm, isConfirmLoading, activePage, role]);

  const showActivePage = (page, title) => {
    if (page === "devices") {
      store.getState().funcGetDevices();
    }
    setActivePage(page);
    outPageTitle(title);
  }
  
  const outPageTitle = (title) => {
    setPageTitle(title)
  }

  return (
    <div className="App wraper wraper_background">
        <Header showActivePage={showActivePage} activePage={activePage} title="Панель администратора"/>
        <Content userName={userName} role={role} showActivePage={showActivePage} outPageTitle={outPageTitle} activePage={activePage} pageTitle={pageTitle}/>
        {/* <Footer showActivePage={showActivePage} activePage={activePage}/>
        {(store.getState().offline)?(<Popup text="Не возможно получить данные. Проверьте интернет-подключение" info="true" error="true" popupShow={()=>{store.dispatch(setDevs({errCount: 0})); store.dispatch(setDevs({offline: false}))}}/>):""}  */}
    </div>
  );

  
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    offline: state["offline"],
    authError: state["authError"],
  }
}

export default connect(mapStateToProps)(App);

