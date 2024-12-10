import store from "../../store";
import { useEffect } from "react";
import { connect } from 'react-redux';
import { Oval } from 'react-loader-spinner'
import AnyOut from "../anyOut";

const DeviceInfoPage = ({ devType = 0, status = 0, pageTitle, users = [] }) => {
  const getData = store.getState().getDevInfo;
  useEffect(() => {
    getData(pageTitle.slice(4));
    const getDataInterval = setInterval(() => getData(pageTitle.slice(4)), 5000);
    return function cleanup() {
      clearInterval(getDataInterval);
    }
  }, []);

  const loadingViev = <div className="content__page"><Oval
    height={100}
    width={100}
    color="#ff8000"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='loading'
    secondaryColor="#FFC400"
    strokeWidth={5}
    strokeWidthSecondary={5}
  /></div>

  const info = <div className="content__page device-detail">
    <h2 className="content__subtitle">Сервисные данные</h2>
    <div className="device-detail__item">
      <span className="device-detail__item-label">ID</span>
      <span className="device-detail__item-value">{pageTitle.slice(4)}</span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Тип устройства</span>
      <span className="device-detail__item-value" style={{ width: "50%", minWidth: '300px' }}>
        {devType === 2 ? 'Котёл бытовой с автоматическим управлением' : 
        devType === 4 ? 'Котёл бытовой с автоматическим управлением и ПИД регулированием' : 'Котёл промышленый с автоматическим управлением'}
        </span>
    </div>
    <h2 className="content__subtitle content__subtitle_nofirst">Текущие показатели</h2>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Состояние</span>
      <span className="device-detail__item-value"><AnyOut outID="status" /></span>
    </div>
    {store.getState().status === -1 && <div className="device-detail__item">
      <span className="device-detail__item-label">Был в сети</span>
      <span className="device-detail__item-value"><AnyOut outID="lastOnlineTime" /></span>
    </div>}
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="tempFlow" units="°C" /></span>
    </div>
    <h2 className="content__subtitle content__subtitle_nofirst">Пользователи</h2>
    {!users || users.length === 0 ? 'Нет пользователей' : users.map(user => (
      <div className="device-detail__item">
        <span className="device-detail__item-label">{user.login}</span>
        <span className="device-detail__item-value" style={{ width: "50%", minWidth: '300px' }}>{user.email}</span>
      </div>
    ))}
  </div>

  return (<>
    {(devType === 0 && status !== -1) ? loadingViev
      : info}
  </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    devType: +state.devType,
    status: state.status,
    users: state.users,
  }
}

export default connect(mapStateToProps)(DeviceInfoPage)
