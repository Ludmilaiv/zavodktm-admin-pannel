import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Button from '../button'
import DeviceForAdmin from "../deviceForAdmin";
import Popup from "../popup"
import axios from "axios";
import data from "../../data";
import store from "../../store";
import { setDevs } from "../../actions";
import { Oval } from  'react-loader-spinner';
import Pagination from "../pagination";


const AllDevices = ({showActivePage, allDevices=null}) => {

  const [addPopup, addPopupShow] = useState(false);
  const [errPopup, errPopupShow] = useState(false);
  const [doneAddPopup, doneAddPopupShow] = useState(false);
  const [id, idSet] = useState("");
  const [type, typeSet] = useState(2);
  const [errMessage, errMessageSet] = useState("");
  const [errId, errIdSet] = useState("");
  const [countPages, setCountPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(localStorage.getItem(localStorage.getItem('admin') + "currentPage") || 1);
  const [minHeight, setMinHeight] = useState(0);
  const [captchaImg, setCaptchaImg] = useState();
  const [captchaText, setCaptchaText] = useState("");

  localStorage.removeItem(localStorage.getItem('admin') + "defaultDevice");

  useEffect(() => {
    if (!currentPage) return;
    const user = localStorage.getItem('admin');
    if (localStorage.getItem(user + "currentPage") !== currentPage) {
      store.dispatch(setDevs({allDevices: null}));
      setMinHeight(currentPage !== countPages ? 55 * 20 : countPages % 20);
      localStorage.setItem(user + "currentPage", currentPage);
      getAllDevices(currentPage);
    } 
  }, [currentPage]);

  useEffect(() => {
    const regex = /^[a-z0-9]+$/i;
    if (id && !regex.test(id)) {
      errIdSet("form__input_err");
      errMessageSet("ID может содержать только цифры и латинские буквы");
    } else {
      errIdSet("");
      errMessageSet("");
      idSet(id.toUpperCase());
    }
  }, [id])

  const loadingViev = <div className="content__page"><Oval
    height={100}
    width={100}
    color="#ff8000"
    wrapperStyle={{margin: '20px', height: '50px'}}
    wrapperClass=""
    visible={true}
    ariaLabel='loading'
    secondaryColor="#FFC400"
    strokeWidth={5}
    strokeWidthSecondary={5}
  /></div>

  const getAllDevices = store.getState().funcGetAllDevices;

  function stopGet() {
    store.dispatch(setDevs({pauseGet: true}));
  }

  function startGet() {
    store.dispatch(setDevs({pauseGet: false}));
  }

  useEffect(() => {
    getAllDevices(currentPage);
    const getDevsInterval = setInterval(()=>getAllDevices(currentPage),5000)
    return function cleanup() {
      clearInterval(getDevsInterval);
    }
  }, []);

  useEffect(() => {
    if (allDevices) {
      setCountPages(allDevices['count']);
      setMinHeight(0);
    }
  }, [allDevices])

  function handleChangeId(event) {
    errMessageSet("");
    errIdSet("");
    idSet(event.target.value);
  }

  const addDevice = () => {
    errMessageSet("");
    errIdSet("");
    setCaptchaImg(null);
    setCaptchaText("");
    if (!id) {
      errMessageSet("Заполните все поля");
      if(!id) errIdSet("form__input_err");
    } else {
      let user = {user_id: localStorage.getItem('admin'), token: localStorage.getItem('admintoken')};
      const dev = {dev_id: id, type: type, ...user }
      if (captchaText) dev["captcha"] = captchaText;
      axios.post(data.addIDURL, dev)
          .then(function (response) {
            if (response.data === 1) {
              addPopupShow(false);
              doneAddPopupShow(true);
            } else {
              if (response.data === "err1") {
                errMessageSet("Устройство с указанным идентификатором уже добавлено ранее");
                errIdSet("form__input_err");
              } else {
                if (response.data === "captcha"){
                  const dev = {dev_id: id, type: type, ...user, getcaptcha: 1 }
                  axios.post(data.addIDURL, dev, {responseType: 'blob'}) 
                      .then((response) => {
                        let blob = response.data;

                        let reader  = new FileReader();

                        reader.onloadend = function () {
                          setCaptchaImg(reader.result);
                          setCaptchaText("");
                        }

                        if (blob) {
                          reader.readAsDataURL(blob);
                        } else {
                          setCaptchaImg(null);
                          setCaptchaText("");
                        }
                      })
                } else {
                  console.log(response.data);
                  getAllDevices();
                  addPopupShow(false);
                  errPopupShow(true);
                }
              }
            } 
          })
          .catch(function (error) {
            console.log(error);
            getAllDevices();
            addPopupShow(false);
            errPopupShow(true);
          });
    }
  }

  const addHTML = 
  <div className="form popup__form form_flex">
    <label className="form__label" htmlFor="devID">Идентификатор устройства</label>
    <input value={id} placeholder='ID устройства' onChange={handleChangeId} className={`form__input ${errId}`} type="text" name="devID"/>
    <label className="form__label" htmlFor="devТуре">Тип устройства</label>
    <select className={`form__input`} name="devType" value={type} 
    onChange={(e) => {typeSet(e.target.value)}}>
      <option value={2}>Котёл бытовой (автомат)</option>
      <option value={4}>Котёл бытовой (автомат + ПИД)</option>
      <option value={3} onClick={()=>typeSet(3)}>Котёл промышленый (автомат)</option>
    </select>
    {captchaImg && <>
      <label className="form__label" htmlFor="captcha">Введите символы с картинки</label>
      <input value={captchaText} placeholder='Символы с картинки' onChange={(e)=>setCaptchaText(e.target.value)} className={`form__input`} type="text" name="captcha"/>
      <img src={captchaImg} alt="captcha"/>
    </>}
    <div className="form__label form__error">{errMessage}</div>
  </div>

 return (
    <> 
      <div className="devices__button-wrap">
        <Button addClass="devices__button" buttonSpan="+ Добавить ID устройства" type="popup" onClick={()=>addPopupShow(true)}/>
      </div>
      {countPages > 1 && <Pagination count={countPages} setPage={setCurrentPage} page={currentPage}/>}
      <ul className="devices" style={{minHeight: `${minHeight}px`}}>
        { allDevices && Array.isArray(allDevices['devs']) ? allDevices['devs'].map(dev => (
          <DeviceForAdmin dev={dev} key={dev.id} stopGet={stopGet} startGet={startGet} showActivePage={showActivePage} addPopup={addPopup}/>
        )) : loadingViev }
      </ul> 
      {countPages > 1 && <Pagination count={countPages} setPage={setCurrentPage} page={currentPage}/>}
      {(addPopup)?<Popup popupOK={()=>addDevice(id,type,localStorage.getItem("admin"))} startProcess={()=>{startGet(); getAllDevices()}} stopProcess={stopGet} popupShow={addPopupShow} text={addHTML}/>:""}
      {(doneAddPopup)?<Popup info="true" time="3000" startProcess={()=>{startGet(); getAllDevices()}} stopProcess={stopGet} popupShow={doneAddPopupShow} text={`Устройство "${id}" успешно добавлено`}/>:""}
      {(errPopup)?<Popup info="true" time="3000" startProcess={()=>{startGet(); getAllDevices()}} stopProcess={stopGet} popupShow={errPopupShow} text="Что-то пошло не так. Проверьте интернет-подключение и попробуйте ещё раз"/>:""}
    </>

    )
}

const mapStateToProps = (state, ownProps) => {
  
  return {
    ...ownProps,
    allDevices: state["allDevices"]
  }
}

export default connect(mapStateToProps)(AllDevices)
