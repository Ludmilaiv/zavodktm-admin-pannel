import { useState } from "react";
import Popup from "../popup"
import axios from "axios";
import data from "../../data";
import store from "../../store";
import classNames from "classnames";
import {useSwipeable} from "react-swipeable";
import {truncStr} from "../../utilits";

let timeout = null;

const Device = ({dev, stopGet, startGet, showActivePage}) => {

  const [delPopup, delPopupShow] = useState(false);
  const [doneDelPopup, doneDelPopupShow] = useState(false);
  const [errPopup, errPopupShow] = useState(false);
  const [editPopup, editPopupShow] = useState(false);
  const [newName, newNameSet] = useState(dev.name);
  const [mode, modeSet] = useState("normal");

  const getDevices = store.getState().funcGetDevices;

  const lookDevice = (name, id) => {
    localStorage.setItem(localStorage.getItem("user")+"defaultDev", id)
    showActivePage("home", name);
  }

  const delDevice = (id) => {
    let dev = {dev_id: id};
    let user = {user_id: localStorage.getItem('user'), token: localStorage.getItem('token')};
    axios.post(data.delDeviceURL, {...dev, ...user})
          .then(function (response) {
            if (response.data === 1) {
              delPopupShow(false);
              doneDelPopupShow(true);
            } else {
              console.log(response.data);
              delPopupShow(false);
              errPopupShow(true);
            }  
          })
          .catch(function (error) {
            console.log(error);
            delPopupShow(false);
            errPopupShow(true);
          });
  }

  const renameDevice = (id, newName) => {
    let dev = {dev_id: id, new_name: newName};
    let user = {user_id: localStorage.getItem('user'), token: localStorage.getItem('token')};
    axios.post(data.editDeviceURL, {...dev, ...user})
          .then(function (response) {
            if (response.data !== 1) {
              editPopupShow(false);
              errPopupShow(true);
            }  else {
              editPopupShow(false);
              startGet();
              getDevices();
            }
          })
          .catch(function (error) {
            console.log(error);
            editPopupShow(false);
            errPopupShow(true);
          });
  }

  const editHTML = 
  <div className="form popup__form form_flex">
    <label className="form__label" htmlFor="nevDevName">Переименовать устройство</label>
    <input maxLength={30} value={newName} onChange={handleChangeNewName} className="form__input" type="text" name="nevDevName"/>
  </div>

  function handleChangeNewName(event) {
    newNameSet(event.target.value);
  }

  const changeMode = () => {
    modeSet(mode === "normal" ? "edit" : "normal");
  }
 
  const swipeHandlers = useSwipeable({
    delta: 60,
    onSwipedLeft: () => changeMode(),
    onSwipedRight: () => changeMode(),
  });

  const longPressHendlers = {
    onTouchStart: () => {
      timeout = setTimeout(() => modeSet("edit"), 500);
    },
    onTouchEnd: () => clearTimeout(timeout),
    onTouchCancel: () => clearTimeout(timeout),
    onTouchMove: () => clearTimeout(timeout)
  }
  
  return (
    <li {...longPressHendlers} {...swipeHandlers} className={`devices__item ${(dev.temp===-3000)?"devices__item_offline":""}`}>
      <div className={classNames(["devices__info", mode])} onClick={()=>mode==="normal" ? lookDevice(dev.name, dev.id) : null}>
        <div>{truncStr(dev.name,30)}</div> 
        {(dev.temp===-3000)?<div className="offline-circle"></div>
        : ((dev.temp===-1270 || dev.temp===-1000)
        ? <div className="devices__info-temp"><div className="online-circle"></div><span>--</span></div>
        : <div className="devices__info-temp"><div className="online-circle"></div>{(dev.temp / 10).toFixed(1)+" °C"}</div>)}
      </div>
      <div className={classNames(["devices__control", mode])}>
        <div className={`devices__del  button button_normal`} onClick={()=>{delPopupShow(true); changeMode()}}></div>
        <div className={`devices__edit  button button_normal`} onClick={()=>{editPopupShow(true); changeMode()}}></div>
        <div className={`devices__close  button button_normal`} onClick={changeMode}></div>
      </div>
      {(delPopup)?<Popup popupOK={()=>delDevice(dev.id)} startProcess={()=>{startGet(); getDevices()}} stopProcess={stopGet} popupShow={delPopupShow} text={`Вы уверены, что хотите удалить устройство "${dev.name}"?`}/>:""}
      {(doneDelPopup)?<Popup info="true" time="3000" startProcess={()=>{startGet(); getDevices()}} stopProcess={stopGet} popupShow={doneDelPopupShow} text={`Устройство "${dev.name}" успешно удалено`}/>:""}
      {(errPopup)?<Popup info="true" time="3000" startProcess={()=> {startGet(); getDevices()}} stopProcess={stopGet} popupShow={errPopupShow} text="Что-то пошло не так. Проверьте интернет-подключение и попробуйте ещё раз"/>:""}
      {(editPopup)?<Popup popupOK={()=>renameDevice(dev.id,newName)} startProcess={()=> {startGet(); getDevices()}} stopProcess={stopGet} popupShow={editPopupShow} text={editHTML}/>:""}
    </li>
)}
    

export default Device
