import { useState } from "react";
import Popup from "../popup"
import axios from "axios";
import data from "../../data";
import store from "../../store";
import classNames from "classnames";

const DeviceForAdmin = ({dev, stopGet, startGet, showActivePage}) => {

  const [delPopup, delPopupShow] = useState(false);
  const [doneDelPopup, doneDelPopupShow] = useState(false);
  const [errPopup, errPopupShow] = useState(false);
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState();

  const getAllDevices = store.getState().funcGetAllDevices;

  const lookDeviceInfo = (myId, id) => {
    showActivePage("deviceInfo", 'ID: ' + myId);
  }

  const delDevice = (id) => {
    let dev = {dev_id: id};
    let user = {user_id: localStorage.getItem('admin'), password};
    axios.post(data.delIDURL, {...dev, ...user})
          .then(function (response) {
            if (response.data === 1) {
              delPopupShow(false);
              doneDelPopupShow(true);
            } else {
              if (response.data === "err1") {
                setErrMessage("Неверный пароль");
              } else {
                console.log(response.data);
                delPopupShow(false);
                errPopupShow(true);
              }
              
            }  
          })
          .catch(function (error) {
            console.log(error);
            delPopupShow(false);
            errPopupShow(true);
          });
  }

  const popupHTML = <>
    <p style={{marginBottom: "10px"}}>Для удаления устройства повторите пароль текущего аккаунта</p>
    <input 
      value={password} 
      className="form__input" 
      type="password" 
      placeholder="Пароль"
      onChange={e => {setErrMessage(); setPassword(e.target.value)}}
    />
    <p className="form__error">{errMessage}</p>
    <p>Вы действительно хотите удалить устройство ID:&nbsp;{dev.my_id}?</p>
  </>
  
  return (
    <li className={`devices__item ${(dev.temp===-3000)?"devices__item_offline":""}`}>
      <div className={classNames(["devices__info"])}>
        <div className={classNames(["devices__control"])}>
          <div className={`devices__del  button button_normal`} onClick={()=>{delPopupShow(true)}}></div>
        </div>
        <div className="devices__info-name" onClick={()=>lookDeviceInfo(dev.my_id, dev.id)}>{dev.my_id}</div>
        <div>
        {dev.icon && <div className="devices__item_warning"><img src={`images/${dev.icon}.svg`} alt="!"/></div>} 
        </div>
        {(dev.temp===-3000)?<div className="devices__info-temp"><div className="offline-circle"></div><span></span></div>
        : ((dev.temp===-1270 || dev.temp===-1000)
        ? <div className="devices__info-temp"><div className="online-circle"></div><span>--</span></div>
        : <div className="devices__info-temp"><div className="online-circle"></div>{(dev.temp / 10).toFixed(1)+" °C"}</div>)}
      </div>
      {(delPopup)?<Popup popupOK={()=>delDevice(dev.id)} startProcess={()=>{startGet(); getAllDevices()}} stopProcess={stopGet} popupShow={delPopupShow} text={popupHTML}/>:""}
      {(doneDelPopup)?<Popup info="true" time="3000" startProcess={()=>{startGet(); getAllDevices()}} stopProcess={stopGet} popupShow={doneDelPopupShow} text={`Устройство "${dev.my_id}" успешно удалено`}/>:""}
      {(errPopup)?<Popup info="true" time="3000" startProcess={()=> {startGet(); getAllDevices()}} stopProcess={stopGet} popupShow={errPopupShow} text="Что-то пошло не так. Проверьте интернет-подключение и попробуйте ещё раз"/>:""}
    </li>
)}
    

export default DeviceForAdmin
