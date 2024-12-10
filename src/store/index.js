import { createStore } from "redux";
import {setTemp, setDevs} from '../actions'
import reducer from "../reducers";
import data from "../data";
import axios from "axios";

/* 
Соответствие с базой данных
t2 - подача
t3 - обратка
t4 - бойлер (шнек1  - пром)
t5 - шнек   (шнек2 - пром)
t6 - комнатная
t7 - уличная
t8 - дымовых газов
t9 - ток   (ток1 - пром)
t10 - (ток2 - пром)
*/

const initialState = {
  funcGetData: getData,
  funcGetDevices: getDevices,
  funcGetAllDevices: getAllDevices,
  functionSendSettings: sendSettings,
  getStatistic: getStatistic,
  getDevInfo: getDevInfo,
  setsForSend: {},
  authError: false,
  devType: 0,
  pauseGet: false,
  offline: false,
  name: null,
  lastOnlineTime: null,
  stat: null,
  errCount: 0,
  status: 0,
  tempFlow: null,
  tempReturn: null,
  tempBolerOrShnek1: null,
  tempShnekOrShek2: null,
  tempRoom: null,
  tempOutside: null,
  tempSmoke: null,
  current: null,
  shnekOrCurrent1: null,
  ventel: null,
  shnek: null,
  shnekOrCurrent2: null,
  ventel2: null,
  shnek2: null,
 
  setsTempCO: null,
  setsGistCO: null,
  setsUgasCO: null,
  setsShnek1: null,
  setsShnek2: null,
  setsSupPerSn1: null,
  setsSupPerSn2: null,
  setsTokShnek1: null,
  setsTokShnek2: null,
  setsVent1: null,
  setsVent2: null,
  setsSupPerVen1: null,
  setsSupPerVen2: null,
  setsTempNasosCO: null,
  setsGistNasosCO: null,
  setsTempKlap: null,
  setsGistClap: null,
  setsOfNasosCOCOND: null,
  setsOnValveCond: null,
  setsStartGor1: null,
  setsStartGor2: null,
  setsPeriodRabGor1: null,
  setsPeriodRabGor2: null,
  setsSupTimSn1: null,
  setsSupTimSn2: null,
  setsMaxSn1: null,
  setsMaxSn2: null,
  setsSubTimVent1: null,
  setsSubTimVent2: null,
  setsMaxVent1: null,
  setsMaxVent2: null,
  pid: null,
  setsToptProf: null,
  setsRozjigDG: null,
  setsTimZapoln: null,
  setsTimRozjig: null,
  setsBrightDisp: null,
  setsOnGV: null,
  setsTempGV: null,
  setsGistGV: null,
  setsOffNasosCOGV: null,
  setsOnKomn: null,
  setsTempRoom: null,
  setsGistRoom: null,
  setsModeKomn: null,
  setsOnUgasCO: null,
  setsTempUgasCO: null,
  setsTimeUgasCO: null,
  setsOnUgasDG: null,
  setsIntDGCO: null,
  setsTimeUgasDG: null,
  setsOnRevers: null,
  setsTimeAttRevers: null,
  setsColAttRevers: null,
  setsOnSavOverHot: null,
  setsTempOverHot: null,
  setsTimeOverHot: null,
  setsPauseOverHot: null,
  setsCoefP: null,
  setsCoefI: null,
  setsCoefD: null,
  stopError: null,

  loading_status: false,
  loading_setsStartGor1: false,
  loading_setsStartGor2: false,
  block_setsStartGor1: false,
  block_setsStartGor2: false,
  block_setsTempCO: false,
  block_setsShnek1: false,
  block_setsShnek2: false,
  block_setsTokShnek1: false,
  block_setsTokShnek2: false,
  block_setsVent1: false,
  block_setsTempGV: false,
  block_setsTempRoom: false,
  block_setsOffNasosCOGV: false,
  block_setsModeKomn: false,
  block_setsOnKomn: false,
  block_setsOnGV: false,
  devices: null,
  alldevices: null,
  users: null,

  statistic: null,
};

const store = createStore(reducer, initialState);


function getDevices() {
  if (store.getState().pauseGet) return;
  let user = {userID: localStorage.getItem('admin'), token: localStorage.getItem('admintoken')};
  axios.post(data.devicesURL, user)
  .then(function (response) {
    if (typeof response.data === "object") {
      store.dispatch(setDevs({offline: false}));
      store.dispatch(setDevs(
        {
          errCount: 0,
          devices: response.data 
        })
      );
    } else {
      if (response.data === 'err5') {
        store.dispatch(setDevs({authError: true}));
      } else {
        store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
        if (store.getState().errCount > 3) {
          store.dispatch(setDevs({offline: true}));
        }
      } 
    }
  })
  .catch(function (error) {
    store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
    console.log(error);
    if (store.getState().errCount > 3) {
      store.dispatch(setDevs({offline: true}));
    } 
  });
}

function getStatistic() {
  let reqData = {userID: localStorage.getItem('admin'), token: localStorage.getItem('admintoken')};
  if (localStorage.getItem(reqData['userID']+"defaultDevice")) {
    reqData['id'] = localStorage.getItem(reqData['userID']+"defaultDevice");
    axios.post(data.getStatURL, reqData)
    .then(function (response) {
      if (typeof response.data === "object") {
        store.dispatch(setTemp(
          {
            errCount: 0,
            statistic: response.data 
          })
        );
      } else {
        if (response.data === 'err5') {
          store.dispatch(setDevs({authError: true}));
        } else {
          store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
          if (store.getState().errCount > 3) {
            store.dispatch(setDevs({offline: true}));
          }
        } 
      }
    })
    .catch(function (error) {
      store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
      console.log(error);
      if (store.getState().errCount > 3) {
        store.dispatch(setDevs({offline: true}));
      } 
    });
  }
  
}

function getAllDevices(page=1) {
  if (store.getState().pauseGet) return;
  let user = {userID: localStorage.getItem('admin'), token: localStorage.getItem('admintoken'), page};
  axios.post(data.allDevicesUrl, user)
  .then(function (response) {
    if (typeof response.data === "object") {
      store.dispatch(setDevs({offline: false}));
      store.dispatch(setDevs(
        {
          errCount: 0,
          allDevices: response.data 
        })
      );
    } else {
      if (response.data === 'err5') {
        store.dispatch(setDevs({authError: true}));
      } else {
        store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
        if (store.getState().errCount > 3) {
          store.dispatch(setDevs({offline: true}));
        }
      } 
    }
  })
  .catch(function (error) {
    store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
    console.log(error);
    if (store.getState().errCount > 3) {
      store.dispatch(setDevs({offline: true}));
    } 
  });
}

const tempDict = {
  'status': 0,
  'tempFlow': 1,
  'tempReturn': 2,
  'tempBolerOrShnek1': 3,
  'tempShnekOrShek2': 4,
  'tempRoom': 5,
  'tempOutside': 6,
  'tempSmoke': 7,
  'current': 8,
  'ventel': 9,
  'shnek': 10,
  'current2': 11,
  'ventel2': 12,
  'shnek2': 13,
}

const setsDict = {
  'setsTempCO': 1,
  'setsGistCO': 2,
  'setsUgasCO': 3,
  'setsShnek1': 4,
  'setsShnek2': 5,
  'setsSupPerSn1': 6,
  'setsSupPerSn2': 7,
  'setsTokShnek1': 8,
  'setsTokShnek2': 9,
  'setsVent1': 10,
  'setsVent2': 11,
  'setsSupPerVen1': 12,
  'setsSupPerVen2': 13,
  'setsTempNasosCO': 14,
  'setsGistNasosCO': 15,
  'setsTempKlap': 16,
  'setsGistClap': 17,
  'setsOfNasosCOCOND': 18,
  'setsOnValveCond': 19,
  'setsStartGor1': 20,
  'setsStartGor2': 21,
  'setsPeriodRabGor1': 22,
  'setsPeriodRabGor2': 23,
  'setsSupTimSn1': 24,
  'setsSupTimSn2': 25,
  'setsMaxSn1': 26,
  'setsMaxSn2': 27,
  'setsSubTimVent1': 28,
  'setsSubTimVent2': 29,
  'setsMaxVent1': 30,
  'setsMaxVent2': 31,
  'pid': 32,
  'setsToptProf': 33,
  'setsRozjigDG': 34,
  'setsTimZapoln': 35,
  'setsTimRozjig': 36,
  'setsBrightDisp': 37,
  'setsOnGV': 38,
  'setsTempGV': 39,
  'setsGistGV': 40,
  'setsOffNasosCOGV': 41,
  'setsOnKomn': 42,
  'setsTempRoom': 43,
  'setsGistRoom': 44,
  'setsModeKomn': 45,
  'setsOnUgasCO': 46,
  'setsTempUgasCO': 47,
  'setsTimeUgasCO': 48,
  'setsOnUgasDG': 49,
  'setsIntDGCO': 50,
  'setsTimeUgasDG': 51,
  'setsOnRevers': 52,
  'setsTimeAttRevers': 53,
  'setsColAttRevers': 54,
  'setsOnSavOverHot': 55,
  'setsTempOverHot': 56,
  'setsTimeOverHot': 57,
  'setsPauseOverHot': 58,
  'setsCoefP': 59,
  'setsCoefI': 60,
  'setsCoefD': 61,
  'stopError': 62,
}

let setsForSendData = {};
let isRegul = false;

function sendSettings(settingsName, value) {
  const k = `s${setsDict[settingsName] + 1}`;
  store.dispatch(setDevs({setsForSend: {...store.getState().setsForSend, [settingsName]: +value}}));
  setsForSendData[k] = +value;
  isRegul = true;
}
 
function getData(){
  let user = {userID: localStorage.getItem('admin'), token: localStorage.getItem('admintoken')};
  if (localStorage.getItem(user['userID']+"defaultDevice")) {
    axios.post(data.getDataURL, {...user, id: localStorage.getItem(user['userID']+"defaultDevice"), sets: setsForSendData})
    .then(function(response) {
      if (typeof response.data !== 'object') {
        if (response.data === 'err5') {
          store.dispatch(setDevs({authError: true}));
        } else {
          store.dispatch(setTemp({errCount: store.getState().errCount + 1}));
          if (store.getState().errCount > 3) {
            store.dispatch(setDevs({offline: true}));
            store.dispatch(setTemp({setsForSend: {}}));
            setsForSendData = {};
          } 
        }
        return;
      }
      if (response.data.temp[0] === -1) {
        const name = response.data.name;
        const stat = response.data.stat;
        const lastOnlineTime = response.data.time_online;
        store.dispatch(setTemp({
          devType: +response.data.type,
          changed: 0,
          errCount: 0,
          status: -1,
          name: name,
          stat: stat,
          lastOnlineTime: lastOnlineTime,
          tempFlow: null,
          tempReturn: null,
          tempBolerOrShnek1: null,
          tempShnekOrShek2: null,
          tempRoom: null,
          tempOutside: null,
          tempSmoke: null,
          current: null,
          current2: null,
          ventel: null,
          ventel2: null,
          shnek: null,
          shnek2: null,
          
          setsTempCO: null,
          setsGistCO: null,
          setsUgasCO: null,
          setsShnek1: null,
          setsShnek2: null,
          setsSupPerSn1: null,
          setsSupPerSn2: null,
          setsTokShnek1: null,
          setsTokShnek2: null,
          setsVent1: null,
          setsVent2: null,
          setsSupPerVen1: null,
          setsSupPerVen2: null,
          setsTempNasosCO: null,
          setsGistNasosCO: null,
          setsTempKlap: null,
          setsGistClap: null,
          setsOfNasosCOCOND: null,
          setsOnValveCond: null,
          setsStartGor1: null,
          setsStartGor2: null,
          setsPeriodRabGor1: null,
          setsPeriodRabGor2: null,
          setsSupTimSn1: null,
          setsSupTimSn2: null,
          setsMaxSn1: null,
          setsMaxSn2: null,
          setsSubTimVent1: null,
          setsSubTimVent2: null,
          setsMaxVent1: null,
          setsMaxVent2: null,
          pid: null,
          setsToptProf: null,
          setsRozjigDG: null,
          setsTimZapoln: null,
          setsTimRozjig: null,
          setsBrightDisp: null,
          setsOnGV: null,
          setsTempGV: null,
          setsGistGV: null,
          setsOffNasosCOGV: null,
          setsOnKomn: null,
          setsTempRoom: null,
          setsGistRoom: null,
          setsModeKomn: null,
          setsOnUgasCO: null,
          setsTempUgasCO: null,
          setsTimeUgasCO: null,
          setsOnUgasDG: null,
          setsIntDGCO: null,
          setsTimeUgasDG: null,
          setsOnRevers: null,
          setsTimeAttRevers: null,
          setsColAttRevers: null,
          setsOnSavOverHot: null,
          setsTempOverHot: null,
          setsTimeOverHot: null,
          setsPauseOverHot: null,
          setsCoefP: null,
          setsCoefI: null,
          setsCoefD: null,
          stopError: null,

          block_setsTempCO: false,
          block_setsShnek1: false,
          block_setsShnek2: false,
          block_setsTokShnek1: false,
          block_setsTokShnek2: false,
          block_setsVent1: false,
          block_setsVent2: false,
          block_setsTempGV: false,
          block_setsTempRoom: false,
          block_setsStartGor1: false,
          block_setsStartGor2: false,

          tatistic: null,
        })) 
      } else {
        const devType = +response.data.type;
        const changed = +response.data.changed;
        const temp = response.data.temp;
        const set = response.data.set;
        const name = response.data.name;
        const stat = response.data.stat;
        store.dispatch(setTemp({
          errCount: 0,
          changed: changed,
          devType: devType,
          name: name,
          stat: stat,
          status: temp[tempDict.status],
          tempFlow: temp[tempDict.tempFlow],
          tempReturn: temp[tempDict.tempReturn],
          tempBolerOrShnek1: temp[tempDict.tempBolerOrShnek1],
          tempShnekOrShek2: temp[tempDict.tempShnekOrShek2],
          tempRoom: temp[tempDict.tempRoom],
          tempOutside: temp[tempDict.tempOutside],
          tempSmoke: temp[tempDict.tempSmoke],
          current: temp[tempDict.current],
          shnek: temp[tempDict.shnek],
          ventel: temp[tempDict.ventel],
          current2: temp[tempDict.current2],
          ventel2: temp[tempDict.ventel2],
          shnek2: temp[tempDict.shnek2],
        }));
        if (!isRegul) {
          store.dispatch(setTemp({setsForSend: {}}));
          setsForSendData = {};
        } else {
          isRegul = false;
        }
        store.dispatch(setTemp({setsTempCO: set[setsDict.setsTempCO]}));
        store.dispatch(setTemp({setsGistCO: set[setsDict.setsGistCO]}));
        store.dispatch(setTemp({setsUgasCO: set[setsDict.setsUgasCO]}));
        store.dispatch(setTemp({setsShnek1: set[setsDict.setsShnek1]}));
        store.dispatch(setTemp({setsShnek2: set[setsDict.setsShnek2]}));
        store.dispatch(setTemp({setsSupPerSn1: set[setsDict.setsSupPerSn1]}));
        store.dispatch(setTemp({setsSupPerSn2: set[setsDict.setsSupPerSn2]}));
        store.dispatch(setTemp({setsTokShnek1: set[setsDict.setsTokShnek1]}));
        store.dispatch(setTemp({setsTokShnek2: set[setsDict.setsTokShnek2]}));
        store.dispatch(setTemp({setsVent1: set[setsDict.setsVent1]}));
        store.dispatch(setTemp({setsVent2: set[setsDict.setsVent2]}));
        store.dispatch(setTemp({setsSupPerVen1: set[setsDict.setsSupPerVen1]}));
        store.dispatch(setTemp({setsSupPerVen2: set[setsDict.setsSupPerVen2]}));
        store.dispatch(setTemp({setsTempNasosCO: set[setsDict.setsTempNasosCO]}));
        store.dispatch(setTemp({setsGistNasosCO: set[setsDict.setsGistNasosCO]}));
        store.dispatch(setTemp({setsTempKlap: set[setsDict.setsTempKlap]}));
        store.dispatch(setTemp({setsGistClap: set[setsDict.setsGistClap]}));
        store.dispatch(setTemp({setsOfNasosCOCOND: set[setsDict.setsOfNasosCOCOND]}));
        store.dispatch(setTemp({setsOnValveCond: set[setsDict.setsOnValveCond]}));
        store.dispatch(setTemp({setsPeriodRabGor1: set[setsDict.setsPeriodRabGor1]}));
        store.dispatch(setTemp({setsPeriodRabGor2: set[setsDict.setsPeriodRabGor2]}));
        store.dispatch(setTemp({setsSupTimSn1: set[setsDict.setsSupTimSn1]}));
        store.dispatch(setTemp({setsSupTimSn2: set[setsDict.setsSupTimSn2]}));
        store.dispatch(setTemp({setsMaxSn1: set[setsDict.setsMaxSn1]}));
        store.dispatch(setTemp({setsMaxSn2: set[setsDict.setsMaxSn2]}));
        store.dispatch(setTemp({setsSubTimVent1: set[setsDict.setsSubTimVent1]}));
        store.dispatch(setTemp({setsSubTimVent2: set[setsDict.setsSubTimVent2]}));
        store.dispatch(setTemp({setsMaxVent1: set[setsDict.setsMaxVent1]}));
        store.dispatch(setTemp({setsMaxVent2: set[setsDict.setsMaxVent2]}));
        store.dispatch(setTemp({setsToptProf: set[setsDict.setsToptProf]}));
        store.dispatch(setTemp({setsRozjigDG: set[setsDict.setsRozjigDG]}));
        store.dispatch(setTemp({setsTimZapoln: set[setsDict.setsTimZapoln]}));
        store.dispatch(setTemp({setsTimRozjig: set[setsDict.setsTimRozjig]}));
        store.dispatch(setTemp({setsBrightDisp: set[setsDict.setsBrightDisp]}));
        store.dispatch(setTemp({setsTempGV: set[setsDict.setsTempGV]}));
        store.dispatch(setTemp({setsGistGV: set[setsDict.setsGistGV]}));
        store.dispatch(setTemp({setsGistRoom: set[setsDict.setsGistRoom]}));
        store.dispatch(setTemp({setsOnUgasCO: set[setsDict.setsOnUgasCO]}));
        store.dispatch(setTemp({setsTempUgasCO: set[setsDict.setsTempUgasCO]}));
        store.dispatch(setTemp({setsOnUgasDG: set[setsDict.setsOnUgasDG]}));
        store.dispatch(setTemp({setsTimeUgasCO: set[setsDict.setsTimeUgasCO]}));
        store.dispatch(setTemp({setsIntDGCO: set[setsDict.setsIntDGCO]}));
        store.dispatch(setTemp({setsTimeUgasDG: set[setsDict.setsTimeUgasDG]}));
        store.dispatch(setTemp({setsOnRevers: set[setsDict.setsOnRevers]}));
        store.dispatch(setTemp({setsTimeAttRevers: set[setsDict.setsTimeAttRevers]}));
        store.dispatch(setTemp({setsColAttRevers: set[setsDict.setsColAttRevers]}));
        store.dispatch(setTemp({setsOnSavOverHot: set[setsDict.setsOnSavOverHot]}));
        store.dispatch(setTemp({setsTempOverHot: set[setsDict.setsTempOverHot]}));
        store.dispatch(setTemp({setsTimeOverHot: set[setsDict.setsTimeOverHot]}));
        store.dispatch(setTemp({setsPauseOverHot: set[setsDict.setsPauseOverHot]}));
        store.dispatch(setTemp({setsCoefP: set[setsDict.setsCoefP]}));
        store.dispatch(setTemp({setsCoefI: set[setsDict.setsCoefI]}));
        store.dispatch(setTemp({setsCoefD: set[setsDict.setsCoefD]}));
        store.dispatch(setTemp({setsTempRoom: set[setsDict.setsTempRoom]}));
        store.dispatch(setTemp({setsStartGor1: set[setsDict.setsStartGor1]}));
        store.dispatch(setTemp({setsStartGor2: set[setsDict.setsStartGor2]}));
        store.dispatch(setTemp({setsOffNasosCOGV: set[setsDict.setsOffNasosCOGV]}));
        store.dispatch(setTemp({setsModeKomn: set[setsDict.setsModeKomn]}));
        store.dispatch(setTemp({setsOnGV: set[setsDict.setsOnGV]}));
        store.dispatch(setTemp({setsOnKomn: set[setsDict.setsOnKomn]}));
        store.dispatch(setTemp({pid: set[setsDict.pid]}));
        store.dispatch(setTemp({stopError: set[setsDict.stopError]}));
      } 
    })
    .catch(function (error) {
      store.dispatch(setTemp({errCount: store.getState().errCount + 1}));
      console.log(error);
      if (store.getState().errCount > 3) {
        store.dispatch(setDevs({offline: true}));
        store.dispatch(setTemp({setsForSend: {}}));
        setsForSendData = {};
      } 
    });
  }
  
}

function getDevInfo(id){
  let user = {userID: localStorage.getItem('admin'), token: localStorage.getItem('admintoken')};
  if (id) {
    axios.post(data.getDeviceInfoURL, {...user, id})
    .then(function(response) {
      if (typeof response.data !== 'object') {
        if (response.data === 'err5') {
          store.dispatch(setDevs({authError: true}));
        } else {
          store.dispatch(setTemp({errCount: store.getState().errCount + 1}));
          if (store.getState().errCount > 3) {
            store.dispatch(setDevs({offline: true}));
          } 
        }
        return;
      }
      if (response.data.temp[0] === -1) {
        const lastOnlineTime = response.data.time_online;
        store.dispatch(setTemp({
          devType: response.data.type,
          changed: 0,
          errCount: 0,
          status: -1,
          lastOnlineTime: lastOnlineTime,
          tempFlow: null,
          users: response.data.users,
        })) 
      } else {
        const devType = +response.data.type;
        const temp = response.data.temp;
        store.dispatch(setTemp({
          errCount: 0,
          devType: devType,
          status: temp[tempDict.status],
          tempFlow: temp[tempDict.tempFlow],
          users: response.data.users,
        }));
      } 
    })
    .catch(function (error) {
      store.dispatch(setTemp({errCount: store.getState().errCount + 1}));
      console.log(error);
      if (store.getState().errCount > 3) {
        store.dispatch(setDevs({offline: true}));
      } 
    });
  }
  
}

export default store;