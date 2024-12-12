import Button from "../button";
import store from "../../store";
import data from "../../data";
import axios from "axios";
import classNames from "classnames";

const BurgerMenu = ({userName, role, showActivePage, activePage}) => {
  const buttonSpan = <span className="button__span button__span_burger"></span>

  function logout() {
    const userId = localStorage.getItem("admin");
    axios.post(data.regURL, {id: userId, logout: localStorage.getItem("admintoken")});
    localStorage.removeItem("admin");
    localStorage.removeItem("admintoken");
    showActivePage("author","Вход");
  }

  function showDevices() {
    store.getState().funcGetDevices();
    showActivePage("devices","Мои устройства");
  }

  function showAllDevices() {
    store.getState().funcGetDevices();
    showActivePage("alldevices","Все устройства (ID)");
  }

  function showAddDevicesPage() {
    store.getState().funcGetDevices();
    showActivePage("adddevices","Добавление ID устройства");
  }

  return (
      <div className="burger-menu">
        <input className="burger-menu__toggle" id="menu__toggle" type="checkbox" />
        <label className="burger-menu__button" htmlFor="menu__toggle">
          <Button addClass="button header__button button_burger" buttonSpan={buttonSpan}/>
        </label>
        <ul className="burger-menu__box">
          <label className="burger-menu__exit" htmlFor="menu__toggle">
          </label>
          <div className="content__user-info">
            <div>{userName ? <>Вы вошли как <b>{userName}</b> </> : ''}</div>
            <div>{role > 0 && role < 3 ? <>Режим доступа: <b>{role === 1 ? 'Администратор' : 'Модератор'}</b> </> : ''}</div>
          </div>
          <li className="burger-menu__item burger-menu__item_first" onClick={logout}><label htmlFor="menu__toggle">Выход</label></li>
          <li className={classNames("burger-menu__item", activePage==="devices" ? "burger-menu__item_active": "")} onClick={showDevices}><label htmlFor="menu__toggle">Мои устройства</label></li>
          <li className="burger-menu__item"><a href={`https://biomatic24.ru/${localStorage.getItem("admin")}`} target="_self">Настройки уведомлений</a></li>
          {+role === 2 && <li className={classNames("burger-menu__item", activePage==="adddevices" ? "burger-menu__item_active": "")} onClick={showAddDevicesPage}><label htmlFor="menu__toggle">Добавление ID устройств</label></li>}
          {+role === 1 && <li className={classNames("burger-menu__item", activePage==="alldevices" ? "burger-menu__item_active": "")} onClick={showAllDevices}><label htmlFor="menu__toggle">Все устройства</label></li>}
          {+role === 1 && <li className="burger-menu__item"><label htmlFor="menu__toggle">Пользователи</label></li>}
        </ul>
      </div>
    ) 
}

export default BurgerMenu