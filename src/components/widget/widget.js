import TempOut from '../tempOut';
import Form from '../form';
import Devices from '../devices';
import AnyOut from "../anyOut";
import Confirm from '../confirm';
import AllDevices from "../allDevices";
import AddDevices from '../addDevices';

const Widget = ({
  typeClass, tempID="tempFlow", setID="setsTempCO", icon, 
  showActivePage,
  activePage,
  devType,
  role,
}) => {

  const className = `widget widget_layout widget_${typeClass} widget_position`;
  const main = typeClass.indexOf("main") === 0;

    // Для виджета на страничке подтверждения адреса эл. почты
    if (typeClass === "confirm") {
      return (
        <div className={className}>
          <Confirm/>
        </div>
      )
    } 

  // Для виджета на страничке авторизации
  if (typeClass === "author") {
    return (
      <div className={className}>
        <Form formType={typeClass} activePage={activePage} showActivePage={showActivePage} />
      </div>
    )
  } 

  // Для виджета на страничке с устройствами

  if (typeClass === "devices") {
    return (
      <div className={className}>
        <Devices showActivePage={showActivePage}/>
      </div>
    )
  }

    // Для виджета на страничке со всеми устройствами

    if (typeClass === "alldevices") {
      return (
        <div className={className}>
          <AllDevices showActivePage={showActivePage}/>
        </div>
      )
    }

    if (typeClass === "adddevices") {
      return (
        <div className={className}>
          <AddDevices showActivePage={showActivePage}/>
        </div>
      )
    }
  
  // // Для виджета на странице настроек котла (kotel)
  // if (typeClass === "kotel") {
  //   return (
  //     <Kotel className={className}/>
  //   )
  // }

  // // Для виджета на странице настроек котла (boler)
  // if (typeClass === "boler") {
  //   return (
  //     <Boler className={className}/>
  //   )
  // }

  // // Для виджета на странице настроек двушнекового котла (settings)
  // if (typeClass === "settings") {
  //   return (
  //     <Settings className={className}/>
  //   )
  // }

  // // Для виджета на странице настроек термостата (termos)
  // if (typeClass === "termos") {
  //   return (
  //     <Termos className={className}/>
  //   )
  // }

  // Для виджета на главной странице контроля устройства (home)

  // const outBottom = 
  //   <div className="widget__out widget__out_bottom">
  //     <span className="widget__span-label">
  //       <AnyOut outID="status"/>
  //     </span>
  //     <span className="widget__span-info widget__span-info_flex">
  //       <span className="widget__span-info-item">
  //         <img className="widget__span-info-img" src="images/shnek.png" alt=""/>
  //         <span className="widget__span-flex">
  //           {store.getState().shnek ? <AnyOut outID="shnek"/> : <AnyOut outID="setsShnek1"/>}
  //           <span className="widget__text_normal">%</span>
  //         </span>
  //       </span>
  //       <span className="widget__span-info-item">
  //         <img className="widget__span-info-img" src="images/ventel.png" alt=""/>
  //         <span className="widget__span-flex">
  //           {store.getState().ventel ? <AnyOut outID="ventel"/> : <AnyOut outID="setsVent1"/>}
  //           <span className="widget__text_normal">%</span>
  //         </span>
  //       </span>
  //     </span>
  //   </div>

    // ДВУШНЕКОВЫЙ. Для виджета на главной странице контроля устройства (home)

    // const outBottomDual = 
    // <div className="widget__out widget__out_bottom widget__out_bottom_long">
    //   <span className="widget__span-info widget__span-info_flex widget__span-info_flex-vertical">
    //     <span className="widget__span-info-item widget__span-info-item_flex">
    //       <img className="widget__span-info-img widget__span-info-img_mg-lr" src="images/fire1.png" alt=""/>
    //       <img className="widget__span-info-img widget__span-info-img_mg-lr" src="images/fire2.png" alt=""/>
    //     </span>
    //     <span className="widget__span-info-item widget__span-info-item_flex">
    //       <img className="widget__span-info-img" src="images/shnek.png" alt=""/>
    //       <span className="widget__span-flex">
    //         {store.getState().shnek ? <AnyOut outID="shnek"/> : <AnyOut outID="setsShnek1" outID2="setsShnek2" units="%" notDecrease={true}/>}
    //       </span>
    //     </span>
    //     <span className="widget__span-info-item widget__span-info-item_flex">
    //       <img className="widget__span-info-img" src="images/amper.png" alt=""/>
    //       <span className="widget__span-flex">
    //         {store.getState().shnek ? <AnyOut outID="shnek"/> : <AnyOut outID="current" outID2="shnekOrCurrent1" units="А" coef={0.01} round={1} notDecrease={true}/>}
    //       </span>
    //     </span>
    //     <span className="widget__span-info-item widget__span-info-item_flex">
    //       <img className="widget__span-info-img" src="images/small-deg.png" alt=""/>
    //       <span className="widget__span-flex">
    //         {store.getState().shnek ? <AnyOut outID="shnek"/> : <AnyOut outID="tempBolerOrShnek1" outID2="tempShnekOrShek2" units="&deg;C" round={0} notDecrease={true}/>}
    //       </span>
    //     </span>
    //     <span className="widget__span-info-item widget__span-info-item_flex">
    //       <img className="widget__span-info-img" src="images/ventel.png" alt=""/>
    //       <span className="widget__span-flex">
    //         {store.getState().ventel ? <AnyOut outID="ventel"/> : <AnyOut outID="setsVent1" outID2="setsVent2" units="%" notDecrease={true}/>}
    //       </span>
    //     </span>
    //   </span>
    // </div>

    const outColumnDual = <div className="widget__out widget__out_column widget__out widget__out_column_left">
      <span className="widget__span-info-item widget__span-info-item_flex">
        <img className="widget__span-info-img_small" src="images/arrow-up.png" alt=""/>
        <span><AnyOut outID="tempReturn" units="&deg;C"/></span>
      </span>
      <span className="widget__span-info-item widget__span-info-item_flex">
        <img className="widget__span-info-img_small" src="images/truba.png" alt=""/>
        <span><AnyOut outID="tempSmoke" units="&deg;C"/></span>
      </span>
    </div>

  return (
    <div className={className}>
      <div className={
          `widget__out widget__out_corner ${typeClass==="main"?"widget__out_corner-big":""}`
          }>
          <AnyOut outID={setID}/>
      </div>
      <TempOut main={main} tempID={tempID}/>
      {(devType === 3) && <span className="widget__span-label widget__span-label_center">
        <AnyOut outID="status"/>
      </span>}
      {(devType === 3) ? outColumnDual : ""}
      {/* {main ? (devType === 3) ? outBottomDual : outBottom : ""} */}
      <div className="widget__icon">
        <img src={`images/icon_${icon}.png`} alt="" className="widget__img"/>
      </div>
    </div>
  )
}

 


export default Widget
