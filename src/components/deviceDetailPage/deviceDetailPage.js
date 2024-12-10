import store from "../../store";
import { useEffect } from "react";
import { connect } from 'react-redux';
import { Oval } from 'react-loader-spinner'
import AnyOut from "../anyOut";
import Slider from "../slider";
import ButtonPlay from "../buttonPlay";
import ButtonOnOff from "../buttonOnOff";
import CheckboxContainer from "../checkboxContainer";
import Input from "../input";
import Curves from "../curves";

const DeviceDetailPage = ({ devType = 0, status = 0, devname = null, outPageTitle, pid, stat=null }) => {
  const getData = store.getState().funcGetData;
  useEffect(() => {
    getData();
    const getDataInterval = setInterval(getData, 3000)
    return function cleanup() {
      clearInterval(getDataInterval);
    }
  }, []);

  useEffect(() => {
    if (devname) {
      outPageTitle(devname);
    }
  }, [devname]);

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

  const oneSheckPidViev = <div className="content__page device-detail">
  <h2 className="content__subtitle">Сервисные данные</h2>
  <div className="device-detail__item">
    <span className="device-detail__item-label">ID</span>
    <span className="device-detail__item-value">{localStorage.getItem(localStorage.getItem('admin') + "defaultDevice")}</span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Тип устройства</span>
    <span className="device-detail__item-value" style={{ width: "50%", minWidth: '300px' }}>Котёл бытовой с автоматическим управлением и ПИД регулированием</span>
  </div>
  {stat && <>
    <h2 className="content__subtitle content__subtitle_nofirst">Статистика</h2>
  <Curves />
  </>}
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
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура обратки</span>
    <span className="device-detail__item-value"><AnyOut outID="tempReturn" units="°C" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура бойлера</span>
    <span className="device-detail__item-value"><AnyOut outID="tempBolerOrShnek1" units="°C" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура шнека</span>
    <span className="device-detail__item-value"><AnyOut outID="tempShnekOrShek2" units="°C" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Комнатная температура</span>
    <span className="device-detail__item-value"><AnyOut outID="tempRoom" units="°C" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Уличная температура</span>
    <span className="device-detail__item-value"><AnyOut outID="tempOutside" units="°C" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура дымовых газов</span>
    <span className="device-detail__item-value"><AnyOut outID="tempSmoke" units="°C" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Ток (шнек)/ Мощность шнека</span>
    <span className="device-detail__item-value"><AnyOut outID="current" coef={0.01} units="A(кВт)" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Уровень вентилятора</span>
    <span className="device-detail__item-value">
      {+pid === 3 ? <AnyOut outID="ventel" units="%" /> : <AnyOut outID="setsVent1" units="%" notDecrease={true} />}</span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Шнек</span>
    <span className="device-detail__item-value">
      {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" units="%" /> : <AnyOut outID="setsShnek1" units="%" notDecrease={true} />}
    </span>
  </div>

  <h2 className="content__subtitle content__subtitle_nofirst">Настройки и управление</h2>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Старт/стоп</span>
    <span className="device-detail__item-value"><AnyOut outID="status" units="°C" /></span>
    <ButtonPlay statusID="status" setID="setsStartGor1" />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура ЦО</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTempCO" units="°C" /></span>
    <Slider outID="setsTempCO" min={10} max={95} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Гистерезис ЦО</span>
    <span className="device-detail__item-value"><AnyOut outID="setsGistCO" units="°C" /></span>
    <Slider outID="setsGistCO" min={1} max={50} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура угасания ЦО</span>
    <span className="device-detail__item-value"><AnyOut outID="setsUgasCO" units="°C" /></span>
    <Slider outID="setsUgasCO" min={1} max={10} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Шнек (%)</span>
    <span className="device-detail__item-value">
      {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" units="%" /> : <AnyOut outID="setsShnek1" units="%" />}
    </span>
    {+pid > 1 && +pid < 4 ? "Авто" : <Slider outID="setsShnek1" min={1} max={100} />}
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Период шнека в поддержке</span>
    <span className="device-detail__item-value"><AnyOut outID="setsSupPerSn1" units="мин" /></span>
    <Slider outID="setsSupPerSn1" min={1} max={250} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Ток шнек/ Мощность шнека</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTokShnek1" coef={0.01} units="А(кВт)" /></span>
    <Slider outID="setsTokShnek1" min={1} max={50} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Вентилятор</span>
    <span className="device-detail__item-value">
      {+pid === 3 ? <AnyOut outID="ventel" units="%" /> : <AnyOut outID="setsVent1" notDecrease={true} units="%" />}
    </span>
    {+pid === 3 ? "Авто" : <Slider outID="setsVent1" min={1} max={100} />}
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Период вентилятора в поддержке</span>
    <span className="device-detail__item-value"><AnyOut outID="setsSupPerVen1" units="мин" /></span>
    <Slider outID="setsSupPerVen1" min={1} max={250} />
  </div>

  <div className="device-detail__item">
    <span className="device-detail__item-label">Отключение насоса по ЦО</span>
    <CheckboxContainer setID='setsOfNasosCOCOND' items={[
      { label: '', value: 1, id: 'setsOfNasosCOCOND' }
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Насос подачи</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTempNasosCO" units="°C" /></span>
    <Slider outID="setsTempNasosCO" min={10} max={70} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Гистерезис насоса подачи</span>
    <span className="device-detail__item-value"><AnyOut outID="setsGistNasosCO" units="°C" /></span>
    <Slider outID="setsGistNasosCO" min={1} max={10} />
  </div>

  <div className="device-detail__item">
    <span className="device-detail__item-label">Управление клапаном по ЦО</span>
    <CheckboxContainer setID='setsOnValveCond' items={[
      { label: '', value: 1, id: 'setsOnValveCond' }
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Клапан</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTempKlap" units="°C" /></span>
    <Slider outID="setsTempKlap" min={10} max={70} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Гистерезис клапана</span>
    <span className="device-detail__item-value"><AnyOut outID="setsGistClap" units="°C" /></span>
    <Slider outID="setsGistClap" min={1} max={10} />
  </div>

  <div className="device-detail__item">
    <span className="device-detail__item-label">Период</span>
    <span className="device-detail__item-value"><AnyOut outID="setsPeriodRabGor1" units="мин" /></span>
    <Slider outID="setsPeriodRabGor1" min={1} max={10} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Время работы шнека в поддержке</span>
    <span className="device-detail__item-value"><AnyOut outID="setsSupTimSn1" units="сек" /></span>
    <Slider outID="setsSupTimSn1" min={1} max={30} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Максимум шека</span>
    <span className="device-detail__item-value"><AnyOut outID="setsMaxSn1" units="%" /></span>
    <Slider outID="setsMaxSn1" min={10} max={100} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Время работы вентилятора в поддержке</span>
    <span className="device-detail__item-value"><AnyOut outID="setsSubTimVent1" units="сек" /></span>
    <Slider outID="setsSubTimVent1" min={1} max={30} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Максимум вентилятора</span>
    <span className="device-detail__item-value"><AnyOut outID="setsMaxVent1" units="%" /></span>
    <Slider outID="setsMaxVent1" min={10} max={100} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Режим ПИД</span>
    <CheckboxContainer setID='pid' uncheck={false} items={[
      { label: '0', value: 0, id: 'pid_1' },
      { label: '1', value: 1, id: 'pid_2' },
      { label: '2', value: 2, id: 'pid_3' },
      { label: '3', value: 3, id: 'pid_4' },
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Коэффициент P котла</span>
    <span className="device-detail__item-value"><Input outID="setsCoefP" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Коэффициент I котла</span>
    <span className="device-detail__item-value"><Input outID="setsCoefI" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Коэффициент D котла</span>
    <span className="device-detail__item-value"><Input outID="setsCoefD" /></span>
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Топливный профиль</span>
    <CheckboxContainer setID='setsToptProf' uncheck={false} items={[
      { label: '0', value: 0, id: 'setsToptProf_1' },
      { label: '1', value: 1, id: 'setsToptProf_2' },
      { label: '2', value: 2, id: 'setsToptProf_3' },
      { label: '3', value: 3, id: 'setsToptProf_4' },
      { label: '4', value: 4, id: 'setsToptProf_5' },
      { label: '5', value: 5, id: 'setsToptProf_6' },
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Темп дымовых газов (розжиг)</span>
    <span className="device-detail__item-value"><AnyOut outID="setsRozjigDG" units="°C" /></span>
    <Slider outID="setsRozjigDG" min={50} max={200} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Время заполнения горелки</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTimZapoln" units="мин" /></span>
    <Slider outID="setsTimZapoln" min={1} max={60} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Время розжига горелки</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTimRozjig" units="мин" /></span>
    <Slider outID="setsTimRozjig" min={1} max={60} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Яркость дисплеся</span>
    <span className="device-detail__item-value"><AnyOut outID="setsBrightDisp" units="%" /></span>
    <Slider outID="setsBrightDisp" min={1} max={100} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Бойлер (вкл/выкл)</span>
    <span className="device-detail__item-value"><AnyOut outID="setsOnGV" /></span>
    <ButtonOnOff setID="setsOnGV" />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура бойлера</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTempGV" units="°C" /></span>
    <Slider outID="setsTempGV" min={40} max={80} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Гистерезис бойлера</span>
    <span className="device-detail__item-value"><AnyOut outID="setsGistGV" units="°C" /></span>
    <Slider outID="setsGistGV" min={1} max={5} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Выключать насос ЦО при работе бойлера</span>
    <CheckboxContainer setID='setsOffNasosCOGV' items={[
      { label: 'выключать', value: 1, id: 'setsOffNasosCOGV' }
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Регулировка термостата (вкл/выкл)</span>
    <span className="device-detail__item-value"><AnyOut outID="setsOnKomn" /></span>
    <ButtonOnOff setID="setsOnKomn" />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Комнатный термостат</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTempRoom" units="°C" /></span>
    <Slider outID="setsTempRoom" min={10} max={40} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Гистерезис комн. термостата</span>
    <span className="device-detail__item-value"><AnyOut outID="setsGistRoom" units="°C" /></span>
    <Slider outID="setsGistRoom" min={1} max={5} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Способ контроля термостата</span>
    <CheckboxContainer setID='setsModeKomn' uncheck={false} items={[
      { label: 'мощностью котла', value: 0, id: 'setsModeKomn_1' },
      { label: 'насосом ЦО', value: 1, id: 'setsModeKomn_2' },
      { label: 'клапаном', value: 2, id: 'setsModeKomn_3' }
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Включить угасание по темп. подачи</span>
    <CheckboxContainer setID='setsOnUgasCO' items={[
      { label: '', value: 1, id: 'setsOnUgasCO' }
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура угасания по темп. подачи</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTempUgasCO" units="°C" /></span>
    <Slider outID="setsTempUgasCO" min={0} max={50} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Время угасания по темп. подачи</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTimeUgasCO" units="мин" /></span>
    <Slider outID="setsTimeUgasCO" min={1} max={180} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Включить угасание по темп. ДГ</span>
    <CheckboxContainer setID='setsOnUgasDG' items={[
      { label: '', value: 1, id: 'setsOnUgasDG' }
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Интервал ДГ-ЦО</span>
    <span className="device-detail__item-value"><AnyOut outID="setsIntDGCO" units="°C" /></span>
    <Slider outID="setsIntDGCO" min={0} max={100} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Время угасания по ДГ</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTimeUgasDG" units="мин" /></span>
    <Slider outID="setsTimeUgasDG" min={1} max={180} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Включить реверс шнека</span>
    <CheckboxContainer setID='setsOnRevers' items={[
      { label: '', value: 1, id: 'setsOnRevers' }
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Время попытки реверса</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTimeAttRevers" units="сек" /></span>
    <Slider outID="setsTimeAttRevers" min={1} max={5} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Кол-во попыток реверса</span>
    <span className="device-detail__item-value"><AnyOut outID="setsColAttRevers" units="" /></span>
    <Slider outID="setsColAttRevers" min={1} max={10} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Включить защиту от перегрева</span>
    <CheckboxContainer setID='setsOnSavOverHot' items={[
      { label: '', value: 1, id: 'setsOnSavOverHot' }
    ]} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Температура перегрева шнека</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTempOverHot" units="°C" /></span>
    <Slider outID="setsTempOverHot" min={50} max={110} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Время подачи при перегреве шнека</span>
    <span className="device-detail__item-value"><AnyOut outID="setsTimeOverHot" units="мин" /></span>
    <Slider outID="setsTimeOverHot" min={1} max={5} />
  </div>
  <div className="device-detail__item">
    <span className="device-detail__item-label">Пауза подачи при перегреве шнека</span>
    <span className="device-detail__item-value"><AnyOut outID="setsPauseOverHot" units="мин" /></span>
    <Slider outID="setsPauseOverHot" min={1} max={10} />
  </div>
</div>

  const oneSheckViev = <div className="content__page device-detail">
    <h2 className="content__subtitle">Сервисные данные</h2>
    <div className="device-detail__item">
      <span className="device-detail__item-label">ID</span>
      <span className="device-detail__item-value">{localStorage.getItem(localStorage.getItem('admin') + "defaultDevice")}</span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Тип устройства</span>
      <span className="device-detail__item-value" style={{ width: "50%", minWidth: '300px' }}>Котёл бытовой с автоматическим управлением</span>
    </div>
    {stat && <>
      <h2 className="content__subtitle content__subtitle_nofirst">Статистика</h2>
    <Curves />
    </>}
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
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура обратки</span>
      <span className="device-detail__item-value"><AnyOut outID="tempReturn" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура бойлера</span>
      <span className="device-detail__item-value"><AnyOut outID="tempBolerOrShnek1" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="tempShnekOrShek2" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Комнатная температура</span>
      <span className="device-detail__item-value"><AnyOut outID="tempRoom" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Уличная температура</span>
      <span className="device-detail__item-value"><AnyOut outID="tempOutside" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура дымовых газов</span>
      <span className="device-detail__item-value"><AnyOut outID="tempSmoke" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Ток (шнек)/ Мощность шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="current" coef={0.01} units="A(кВт)" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Уровень вентилятора</span>
      <span className="device-detail__item-value">
        {+pid === 3 ? <AnyOut outID="ventel" units="%" /> : <AnyOut outID="setsVent1" units="%" notDecrease={true} />}</span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Шнек</span>
      <span className="device-detail__item-value">
        {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" units="%" /> : <AnyOut outID="setsShnek1" units="%" notDecrease={true} />}
      </span>
    </div>

    <h2 className="content__subtitle content__subtitle_nofirst">Настройки и управление</h2>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Старт/стоп</span>
      <span className="device-detail__item-value"><AnyOut outID="status" units="°C" /></span>
      <ButtonPlay statusID="status" setID="setsStartGor1" />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура ЦО</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempCO" units="°C" /></span>
      <Slider outID="setsTempCO" min={10} max={95} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис ЦО</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistCO" units="°C" /></span>
      <Slider outID="setsGistCO" min={1} max={50} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура угасания ЦО</span>
      <span className="device-detail__item-value"><AnyOut outID="setsUgasCO" units="°C" /></span>
      <Slider outID="setsUgasCO" min={1} max={10} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Шнек (%)</span>
      <span className="device-detail__item-value">
        {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" units="%" /> : <AnyOut outID="setsShnek1" units="%" />}
      </span>
      {+pid > 1 && +pid < 4 ? "Авто" : <Slider outID="setsShnek1" min={1} max={100} />}
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Период шнека в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupPerSn1" units="мин" /></span>
      <Slider outID="setsSupPerSn1" min={1} max={250} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Ток шнек/ Мощность шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTokShnek1" coef={0.01} units="А(кВт)" /></span>
      <Slider outID="setsTokShnek1" min={1} max={50} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Вентилятор</span>
      <span className="device-detail__item-value">
        {+pid === 3 ? <AnyOut outID="ventel" units="%" /> : <AnyOut outID="setsVent1" notDecrease={true} units="%" />}
      </span>
      {+pid === 3 ? "Авто" : <Slider outID="setsVent1" min={1} max={100} />}
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Период вентилятора в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupPerVen1" units="мин" /></span>
      <Slider outID="setsSupPerVen1" min={1} max={250} />
    </div>

    <div className="device-detail__item">
      <span className="device-detail__item-label">Отключение насоса по ЦО</span>
      <CheckboxContainer setID='setsOfNasosCOCOND' items={[
        { label: '', value: 1, id: 'setsOfNasosCOCOND' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Насос подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempNasosCO" units="°C" /></span>
      <Slider outID="setsTempNasosCO" min={10} max={70} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис насоса подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistNasosCO" units="°C" /></span>
      <Slider outID="setsGistNasosCO" min={1} max={10} />
    </div>

    <div className="device-detail__item">
      <span className="device-detail__item-label">Управление клапаном по ЦО</span>
      <CheckboxContainer setID='setsOnValveCond' items={[
        { label: '', value: 1, id: 'setsOnValveCond' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Клапан</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempKlap" units="°C" /></span>
      <Slider outID="setsTempKlap" min={10} max={70} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис клапана</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistClap" units="°C" /></span>
      <Slider outID="setsGistClap" min={1} max={10} />
    </div>

    <div className="device-detail__item">
      <span className="device-detail__item-label">Период</span>
      <span className="device-detail__item-value"><AnyOut outID="setsPeriodRabGor1" units="мин" /></span>
      <Slider outID="setsPeriodRabGor1" min={1} max={10} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время работы шнека в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupTimSn1" units="сек" /></span>
      <Slider outID="setsSupTimSn1" min={1} max={30} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Максимум шека</span>
      <span className="device-detail__item-value"><AnyOut outID="setsMaxSn1" units="%" /></span>
      <Slider outID="setsMaxSn1" min={10} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время работы вентилятора в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSubTimVent1" units="сек" /></span>
      <Slider outID="setsSubTimVent1" min={1} max={30} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Максимум вентилятора</span>
      <span className="device-detail__item-value"><AnyOut outID="setsMaxVent1" units="%" /></span>
      <Slider outID="setsMaxVent1" min={10} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Режим ПИД</span>
      Не поддерживается
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Топливный профиль</span>
      <CheckboxContainer setID='setsToptProf' uncheck={false} items={[
        { label: '0', value: 0, id: 'setsToptProf_1' },
        { label: '1', value: 1, id: 'setsToptProf_2' },
        { label: '2', value: 2, id: 'setsToptProf_3' },
        { label: '3', value: 3, id: 'setsToptProf_4' },
        { label: '4', value: 4, id: 'setsToptProf_5' },
        { label: '5', value: 5, id: 'setsToptProf_6' },
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Темп дымовых газов (розжиг)</span>
      <span className="device-detail__item-value"><AnyOut outID="setsRozjigDG" units="°C" /></span>
      <Slider outID="setsRozjigDG" min={50} max={200} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время заполнения горелки</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimZapoln" units="мин" /></span>
      <Slider outID="setsTimZapoln" min={1} max={60} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время розжига горелки</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimRozjig" units="мин" /></span>
      <Slider outID="setsTimRozjig" min={1} max={60} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Яркость дисплеся</span>
      <span className="device-detail__item-value"><AnyOut outID="setsBrightDisp" units="%" /></span>
      <Slider outID="setsBrightDisp" min={1} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Бойлер (вкл/выкл)</span>
      <span className="device-detail__item-value"><AnyOut outID="setsOnGV" /></span>
      <ButtonOnOff setID="setsOnGV" />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура бойлера</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempGV" units="°C" /></span>
      <Slider outID="setsTempGV" min={40} max={80} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис бойлера</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistGV" units="°C" /></span>
      <Slider outID="setsGistGV" min={1} max={5} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Выключать насос ЦО при работе бойлера</span>
      <CheckboxContainer setID='setsOffNasosCOGV' items={[
        { label: 'выключать', value: 1, id: 'setsOffNasosCOGV' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Регулировка термостата (вкл/выкл)</span>
      <span className="device-detail__item-value"><AnyOut outID="setsOnKomn" /></span>
      <ButtonOnOff setID="setsOnKomn" />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Комнатный термостат</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempRoom" units="°C" /></span>
      <Slider outID="setsTempRoom" min={10} max={40} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис комн. термостата</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistRoom" units="°C" /></span>
      <Slider outID="setsGistRoom" min={1} max={5} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Способ контроля термостата</span>
      <CheckboxContainer setID='setsModeKomn' uncheck={false} items={[
        { label: 'мощностью котла', value: 0, id: 'setsModeKomn_1' },
        { label: 'насосом ЦО', value: 1, id: 'setsModeKomn_2' },
        { label: 'клапаном', value: 2, id: 'setsModeKomn_3' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Включить угасание по темп. подачи</span>
      <CheckboxContainer setID='setsOnUgasCO' items={[
        { label: '', value: 1, id: 'setsOnUgasCO' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура угасания по темп. подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempUgasCO" units="°C" /></span>
      <Slider outID="setsTempUgasCO" min={0} max={50} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время угасания по темп. подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimeUgasCO" units="мин" /></span>
      <Slider outID="setsTimeUgasCO" min={1} max={180} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Включить угасание по темп. ДГ</span>
      <CheckboxContainer setID='setsOnUgasDG' items={[
        { label: '', value: 1, id: 'setsOnUgasDG' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Интервал ДГ-ЦО</span>
      <span className="device-detail__item-value"><AnyOut outID="setsIntDGCO" units="°C" /></span>
      <Slider outID="setsIntDGCO" min={0} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время угасания по ДГ</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimeUgasDG" units="мин" /></span>
      <Slider outID="setsTimeUgasDG" min={1} max={180} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Включить реверс шнека</span>
      <CheckboxContainer setID='setsOnRevers' items={[
        { label: '', value: 1, id: 'setsOnRevers' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время попытки реверса</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimeAttRevers" units="сек" /></span>
      <Slider outID="setsTimeAttRevers" min={1} max={5} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Кол-во попыток реверса</span>
      <span className="device-detail__item-value"><AnyOut outID="setsColAttRevers" units="" /></span>
      <Slider outID="setsColAttRevers" min={1} max={10} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Включить защиту от перегрева</span>
      <CheckboxContainer setID='setsOnSavOverHot' items={[
        { label: '', value: 1, id: 'setsOnSavOverHot' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура перегрева шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempOverHot" units="°C" /></span>
      <Slider outID="setsTempOverHot" min={50} max={110} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время подачи при перегреве шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimeOverHot" units="мин" /></span>
      <Slider outID="setsTimeOverHot" min={1} max={5} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Пауза подачи при перегреве шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="setsPauseOverHot" units="мин" /></span>
      <Slider outID="setsPauseOverHot" min={1} max={10} />
    </div>
  </div>

  const twoSheckViev = <div className="content__page device-detail">
    <h2 className="content__subtitle">Сервисные данные</h2>
    <div className="device-detail__item">
      <span className="device-detail__item-label">ID</span>
      <span className="device-detail__item-value">{localStorage.getItem(localStorage.getItem('admin') + "defaultDevice")}</span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Тип устройства</span>
      <span className="device-detail__item-value" style={{ width: "50%", minWidth: '300px' }}>Котёл промышленный с автоматическим управлением</span>
    </div>
    <h2 className="content__subtitle content__subtitle_nofirst">Текущие показатели</h2>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Состояние</span>
      <span className="device-detail__item-value"><AnyOut outID="status" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="tempFlow" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура обратки</span>
      <span className="device-detail__item-value"><AnyOut outID="tempReturn" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура шнека 1</span>
      <span className="device-detail__item-value"><AnyOut outID="tempBolerOrShnek1" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура шнека 2</span>
      <span className="device-detail__item-value"><AnyOut outID="tempShnekOrShek2" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Комнатная температура</span>
      <span className="device-detail__item-value"><AnyOut outID="tempRoom" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Уличная температура</span>
      <span className="device-detail__item-value"><AnyOut outID="tempOutside" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура дымовых газов</span>
      <span className="device-detail__item-value"><AnyOut outID="tempSmoke" units="°C" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Ток (шнек 1)/ Мощность шнека 1</span>
      <span className="device-detail__item-value"><AnyOut outID="current" coef={0.01} units="A(кВт)" /></span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Ток (шнек 2)/ Мощность шнека 2</span>
      <span className="device-detail__item-value">
        {store.getState().current2 ? <AnyOut outID="current2" coef={0.01} units="A(кВт)" />
          : <AnyOut outID="ventel" coef={0.01} units="A(кВт)" />}
      </span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Уровень вентилятора 1</span>
      <span className="device-detail__item-value">
        {+pid === 3 ? <AnyOut outID="ventel" units="%" /> : <AnyOut outID="setsVent1" units="%" />}</span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Уровень вентилятора 2</span>
      <span className="device-detail__item-value">
        {+pid === 3 ? <AnyOut outID="ventel2" units="%" /> : <AnyOut outID="setsVent2" units="%" />}</span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Шнек 1</span>
      <span className="device-detail__item-value">
        {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" units="%" /> : <AnyOut outID="setsShnek1" units="%" />}
      </span>
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Шнек 2</span>
      <span className="device-detail__item-value">
        {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek2" units="%" /> : <AnyOut outID="setsShnek2" units="%" />}
      </span>
    </div>

    <h2 className="content__subtitle content__subtitle_nofirst">Настройки и управление</h2>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Старт/стоп</span>
      <span className="device-detail__item-value"><AnyOut outID="status" units="°C" /></span>
      <div style={{ textAlign: "center" }}>
        Гор.1
        <ButtonPlay statusID="status" setID="setsStartGor1" />
      </div>
      <div style={{ textAlign: "center" }}>
        Гор.2
        <ButtonPlay statusID="status" setID="setsStartGor2" />
      </div>

    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура ЦО</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempCO" units="°C" /></span>
      <Slider outID="setsTempCO" min={10} max={95} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис ЦО</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistCO" units="°C" /></span>
      <Slider outID="setsGistCO" min={1} max={50} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура угасания ЦО</span>
      <span className="device-detail__item-value"><AnyOut outID="setsUgasCO" units="°C" /></span>
      <Slider outID="setsUgasCO" min={1} max={10} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Шнек 1 (%)</span>
      <span className="device-detail__item-value">
        {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" units="%" /> : <AnyOut outID="setsShnek1" units="%" />}
      </span>
      {+pid > 1 && +pid < 4 ? "Авто" : <Slider outID="setsShnek1" min={1} max={100} />}
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Шнек 2 (%)</span>
      <span className="device-detail__item-value">
        {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" units="%" /> : <AnyOut outID="setsShnek2" units="%" />}
      </span>
      {+pid > 1 && +pid < 4 ? "Авто" : <Slider outID="setsShnek2" min={1} max={100} />}
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Период шнека 1 в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupPerSn1" units="мин" /></span>
      <Slider outID="setsSupPerSn1" min={1} max={250} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Период шнека 2 в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupPerSn2" units="мин" /></span>
      <Slider outID="setsSupPerSn2" min={1} max={250} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Ток шнек 1/ Мощность шнека 1</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTokShnek1" coef={0.01} units="А(кВт)" /></span>
      <Slider outID="setsTokShnek1" min={1} max={50} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Ток шнек 2/ Мощность шнека 2</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTokShnek2" coef={0.01} units="А(кВт)" /></span>
      <Slider outID="setsTokShnek2" min={1} max={50} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Вентилятор 1</span>
      <span className="device-detail__item-value">
        {+pid === 3 ? <AnyOut outID="ventel" units="%" /> : <AnyOut outID="setsVent1" notDecrease={true} units="%" />}
      </span>
      {+pid === 3 ? "Авто" : <Slider outID="setsVent1" min={1} max={100} />}
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Вентилятор 2</span>
      <span className="device-detail__item-value">
        {+pid === 3 ? <AnyOut outID="ventel2" units="%" /> : <AnyOut outID="setsVent2" notDecrease={true} units="%" />}
      </span>
      {+pid === 3 ? "Авто" : <Slider outID="setsVent2" min={1} max={100} />}
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Период вентилятора 1 в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupPerVen1" units="мин" /></span>
      <Slider outID="setsSupPerVen1" min={1} max={250} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Период вентилятора 2 в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupPerVen2" units="мин" /></span>
      <Slider outID="setsSupPerVen2" min={1} max={250} />
    </div>

    <div className="device-detail__item">
      <span className="device-detail__item-label">Отключение насоса по ЦО</span>
      <CheckboxContainer setID='setsOfNasosCOCOND' items={[
        { label: '', value: 1, id: 'setsOfNasosCOCOND' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Насос подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempNasosCO" units="°C" /></span>
      <Slider outID="setsTempNasosCO" min={10} max={70} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис насоса подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistNasosCO" units="°C" /></span>
      <Slider outID="setsGistNasosCO" min={1} max={10} />
    </div>

    <div className="device-detail__item">
      <span className="device-detail__item-label">Управление клапаном по ЦО</span>
      <CheckboxContainer setID='setsOnValveCond' items={[
        { label: '', value: 1, id: 'setsOnValveCond' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Клапан</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempKlap" units="°C" /></span>
      <Slider outID="setsTempKlap" min={10} max={70} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис клапана</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistClap" units="°C" /></span>
      <Slider outID="setsGistClap" min={1} max={10} />
    </div>

    <div className="device-detail__item">
      <span className="device-detail__item-label">Период 1</span>
      <span className="device-detail__item-value"><AnyOut outID="setsPeriodRabGor1" units="мин" /></span>
      <Slider outID="setsPeriodRabGor1" min={1} max={10} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Период 2</span>
      <span className="device-detail__item-value"><AnyOut outID="setsPeriodRabGor2" units="мин" /></span>
      <Slider outID="setsPeriodRabGor2" min={1} max={10} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время работы шнека 1 в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupTimSn1" units="сек" /></span>
      <Slider outID="setsSupTimSn1" min={1} max={30} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время работы шнека 2 в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSupTimSn2" units="сек" /></span>
      <Slider outID="setsSupTimSn2" min={1} max={30} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Максимум шека 1</span>
      <span className="device-detail__item-value"><AnyOut outID="setsMaxSn1" units="%" /></span>
      <Slider outID="setsMaxSn1" min={10} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Максимум шека 2</span>
      <span className="device-detail__item-value"><AnyOut outID="setsMaxSn2" units="%" /></span>
      <Slider outID="setsMaxSn2" min={10} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время работы вентилятора 1 в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSubTimVent1" units="сек" /></span>
      <Slider outID="setsSubTimVent1" min={1} max={30} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время работы вентилятора 2 в поддержке</span>
      <span className="device-detail__item-value"><AnyOut outID="setsSubTimVent2" units="сек" /></span>
      <Slider outID="setsSubTimVent2" min={1} max={30} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Максимум вентилятора 1</span>
      <span className="device-detail__item-value"><AnyOut outID="setsMaxVent1" units="%" /></span>
      <Slider outID="setsMaxVent1" min={10} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Максимум вентилятора 2</span>
      <span className="device-detail__item-value"><AnyOut outID="setsMaxVent2" units="%" /></span>
      <Slider outID="setsMaxVent2" min={10} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Режим ПИД</span>
      Не поддерживается
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Топливный профиль</span>
      <CheckboxContainer setID='setsToptProf' uncheck={false} items={[
        { label: '0', value: 0, id: 'setsToptProf_1' },
        { label: '1', value: 1, id: 'setsToptProf_2' },
        { label: '2', value: 2, id: 'setsToptProf_3' },
        { label: '3', value: 3, id: 'setsToptProf_4' },
        { label: '4', value: 4, id: 'setsToptProf_5' },
        { label: '5', value: 5, id: 'setsToptProf_6' },
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Темп дымовых газов (розжиг)</span>
      <span className="device-detail__item-value"><AnyOut outID="setsRozjigDG" units="°C" /></span>
      <Slider outID="setsRozjigDG" min={50} max={200} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время заполнения горелки</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimZapoln" units="мин" /></span>
      <Slider outID="setsTimZapoln" min={1} max={60} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время розжига горелки</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimRozjig" units="мин" /></span>
      <Slider outID="setsTimRozjig" min={1} max={60} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Яркость дисплеся</span>
      <span className="device-detail__item-value"><AnyOut outID="setsBrightDisp" units="%" /></span>
      <Slider outID="setsBrightDisp" min={1} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Бойлер (вкл/выкл)</span>
      <span className="device-detail__item-value"><AnyOut outID="setsOnGV" /></span>
      <ButtonOnOff setID="setsOnGV" />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура бойлера</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempGV" units="°C" /></span>
      <Slider outID="setsTempGV" min={40} max={80} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис бойлера</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistGV" units="°C" /></span>
      <Slider outID="setsGistGV" min={1} max={5} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Выключать насос ЦО при работе бойлера</span>
      <CheckboxContainer setID='setsOffNasosCOGV' items={[
        { label: 'выключать', value: 1, id: 'setsOffNasosCOGV' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Регулировка термостата (вкл/выкл)</span>
      <span className="device-detail__item-value"><AnyOut outID="setsOnKomn" /></span>
      <ButtonOnOff setID="setsOnKomn" />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Комнатный термостат</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempRoom" units="°C" /></span>
      <Slider outID="setsTempRoom" min={10} max={40} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Гистерезис комн. термостата</span>
      <span className="device-detail__item-value"><AnyOut outID="setsGistRoom" units="°C" /></span>
      <Slider outID="setsGistRoom" min={1} max={5} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Способ контроля термостата</span>
      <CheckboxContainer setID='setsModeKomn' uncheck={false} items={[
        { label: 'мощностью котла', value: 0, id: 'setsModeKomn_1' },
        { label: 'насосом ЦО', value: 1, id: 'setsModeKomn_2' },
        { label: 'клапаном', value: 2, id: 'setsModeKomn_3' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Включить угасание по темп. подачи</span>
      <CheckboxContainer setID='setsOnUgasCO' items={[
        { label: '', value: 1, id: 'setsOnUgasCO' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура угасания по темп. подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempUgasCO" units="°C" /></span>
      <Slider outID="setsTempUgasCO" min={0} max={50} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время угасания по темп. подачи</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimeUgasCO" units="мин" /></span>
      <Slider outID="setsTimeUgasCO" min={1} max={180} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Включить угасание по темп. ДГ</span>
      <CheckboxContainer setID='setsOnUgasDG' items={[
        { label: '', value: 1, id: 'setsOnUgasDG' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Интервал ДГ-ЦО</span>
      <span className="device-detail__item-value"><AnyOut outID="setsIntDGCO" units="°C" /></span>
      <Slider outID="setsIntDGCO" min={0} max={100} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время угасания по ДГ</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimeUgasDG" units="мин" /></span>
      <Slider outID="setsTimeUgasDG" min={1} max={180} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Включить реверс шнека</span>
      <CheckboxContainer setID='setsOnRevers' items={[
        { label: '', value: 1, id: 'setsOnRevers' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время попытки реверса</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimeAttRevers" units="сек" /></span>
      <Slider outID="setsTimeAttRevers" min={1} max={5} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Кол-во попыток реверса</span>
      <span className="device-detail__item-value"><AnyOut outID="setsColAttRevers" units="" /></span>
      <Slider outID="setsColAttRevers" min={1} max={10} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Включить защиту от перегрева</span>
      <CheckboxContainer setID='setsOnSavOverHot' items={[
        { label: '', value: 1, id: 'setsOnSavOverHot' }
      ]} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Температура перегрева шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTempOverHot" units="°C" /></span>
      <Slider outID="setsTempOverHot" min={50} max={110} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Время подачи при перегреве шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="setsTimeOverHot" units="мин" /></span>
      <Slider outID="setsTimeOverHot" min={1} max={5} />
    </div>
    <div className="device-detail__item">
      <span className="device-detail__item-label">Пауза подачи при перегреве шнека</span>
      <span className="device-detail__item-value"><AnyOut outID="setsPauseOverHot" units="мин" /></span>
      <Slider outID="setsPauseOverHot" min={1} max={10} />
    </div>
  </div>

  return (<>
    {(devType === 0) ? loadingViev
      : (devType === 3) ? twoSheckViev
        : (devType === 4) ? oneSheckPidViev : oneSheckViev}
  </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    devType: +state.devType,
    status: state.status,
    devname: state.name,
    pid: state.pid,
    stat: state.stat,
  }
}

export default connect(mapStateToProps)(DeviceDetailPage)
