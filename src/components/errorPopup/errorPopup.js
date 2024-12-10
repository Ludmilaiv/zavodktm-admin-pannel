import { connect } from 'react-redux';
import store from "../../store";
import Popup from "../popup";
import React, { useState } from 'react';

const ErrorPopup = ({
  name,
  status,
  stopError,
  showActivePage,
  devType,
  tempFlow,
  tempReturn,
  tempBolerOrShnek1,
  tempShnekOrShek2,
  tempRoom,
  tempOutside,
  tempSmoke,
  setsForSend,
}) => {
  const [waringClosed, setWaringClosed] = useState(false);

  let warningBtn = "";

  if (devType !== 0) {
    // Показ заглушек для ручного управления
    if (+status === 5) return (
      <Popup text={<><h3><span className="warning-label" ><img src="images/service-block.svg" alt="!"/></span>НЕТ ДОСТУПА</h3>Устройство "{name}" находится в режиме ручного управления</>} info="true" error="false" popupShow={() => showActivePage('devices', 'Устройства')} />
    );
    if (+status === 6) return (
      <Popup text={<><h3><span className="warning-label" ><img src="images/service-block.svg" alt="!"/></span>НЕТ ДОСТУПА</h3>Устройство "{name}" находится в сервисном режиме</>} info="true" error="false" popupShow={() => showActivePage('devices', 'Устройства')} />
    );
    if (+status === 7) return (
      <Popup text={<><h3><span className="warning-label" ><img src="images/service-block.svg" alt="!"/></span>НЕТ ДОСТУПА</h3>Неисправность силового реле</>} info="true" error="false" popupShow={() => showActivePage('devices', 'Устройства')} />);

    // Показ предупреждений о неисправностях
    if (+status >= 0) {
      const arWarnings = [];
      if (+tempFlow === -1270) arWarnings.push('Неисправен датчик температуры подачи');
      if (+tempReturn === -1270) arWarnings.push('Неисправен датчик температуры обратки');
      if (+tempBolerOrShnek1 === -1270) {
        if (devType === 3) arWarnings.push('Неисправен датчик температуры первого шнека')
        else arWarnings.push('Неисправен датчик температуры бойлера');
      }
      if (+tempShnekOrShek2 === -1270) {
        if (devType === 3) arWarnings.push('Неисправен датчик температуры второго шнека')
        else arWarnings.push('Неисправен датчик температуры шнека');
      }
      if (+tempRoom === -1270) arWarnings.push('Неисправен датчик комнатной температуры');
      if (+tempOutside === -1270) arWarnings.push('Неисправен датчик уличной температуры');
      if (+tempSmoke === -1270) arWarnings.push('Неисправен датчик температуры дымовых газов');
      if (arWarnings.length !== 0) {
        if (!waringClosed) return (
          <Popup text={<><h3><span className="warning-label" ><img src="images/warning.svg" alt="!"/></span>ВНИМАНИЕ!</h3><ul className="error-popup__list">{
            arWarnings.map((el) => <li>{el}</li>)
          }</ul></>} info="true" error="false" popupShow={() => setWaringClosed(true)} />
        ) 
        else warningBtn = <button className="warning-label__btn" 
        onClick={() => setWaringClosed(false)}>
          <img src="images/warning.svg" alt="!"/> Неисправности!
          </button>;
      }
    }

    // Показ критических ошибок
    if (status >= 0 && +setsForSend['stopError'] !== 0) {
      if (+stopError === 1) return (<>
        {warningBtn}
        <Popup text={<><h3><span className="warning-label" ><img src="images/danger.svg" alt="!"/>
        </span>ВНИМАНИЕ!</h3>Работа котла прервана. Неисправен датчик подачи.</>} info="true" error="true" popupShow={() => {store.getState().functionSendSettings('stopError', 0); }} /></>
      )
      if (+stopError === 2) return (<>
        {warningBtn}
        <Popup text={<><h3><span className="warning-label" ><img src="images/danger.svg" alt="!"/>
        </span>ВНИМАНИЕ!</h3>Работа котла прервана. Заклинивание шнека</>} info="true" error="true" popupShow={() => {store.getState().functionSendSettings('stopError', 0);}} /></>
      )
      if (+stopError === 3) return (<>
        {warningBtn}
        <Popup text={<><h3><span className="warning-label" ><img src="images/danger.svg" alt="!"/>
        </span>ВНИМАНИЕ!</h3>Котёл угас. Низкая температура подачи</>} info="true" error="true" popupShow={() => {store.getState().functionSendSettings('stopError', 0);}} /></>
      )
      if (+stopError === 4) return (<>
        {warningBtn}
        <Popup text={<><h3><span className="warning-label" ><img src="images/danger.svg" alt="!"/>
        </span>ВНИМАНИЕ!</h3>Котёл угас. Низкая температура дымовых газов</>} info="true" error="true" popupShow={() => {store.getState().functionSendSettings('stopError', 0);}} /></>
      )
      if (+stopError === 5) return (<>
        {warningBtn}
        <Popup text={<><h3><span className="warning-label" ><img src="images/danger.svg" alt="!"/>
        </span>ВНИМАНИЕ!</h3>Работа котла прервана. Перегрев</>} info="true" error="true" popupShow={() => {store.getState().functionSendSettings('stopError', 0);}} /></>
      )
      if (+stopError === 6) return (<>
        {warningBtn}
        <Popup text={<><h3><span className="warning-label" ><img src="images/danger.svg" alt="!"/>
        </span>ВНИМАНИЕ!</h3>Работа котла прервана. Неисправно силовое реле</>} info="true" error="true" popupShow={() => {store.getState().functionSendSettings('stopError', 0);}} /></>
      )
      if (+stopError === 7) return (<>
        {warningBtn}
        <Popup text={<><h3><span className="warning-label" ><img src="images/danger.svg" alt="!"/>
        </span>ВНИМАНИЕ!</h3>Работа котла прервана. Обрыв питания шнека</>} info="true" error="true" popupShow={() => {store.getState().functionSendSettings('stopError', 0);}} /></>
      )
    }
  }

  return warningBtn;

}

const mapStateToProps = (state, ownProps) => {

  return {
    ...ownProps,
    name: state.name,
    status: state.status,
    stopError: state.stopError,
    devType: state.devType,
    tempFlow: state.tempFlow,
    tempReturn: state.tempReturn,
    tempBolerOrShnek1: state.tempBolerOrShnek1,
    tempShnekOrShek2: state.tempShnekOrShek2,
    tempRoom: state.tempRoom,
    tempOutside: state.tempOutside,
    tempSmoke: state.tempSmoke,
    setsForSend: state.setsForSend,
  }
}

export default connect(mapStateToProps)(ErrorPopup)
