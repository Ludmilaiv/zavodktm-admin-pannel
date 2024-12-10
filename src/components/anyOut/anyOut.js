import { connect } from 'react-redux';
import data from "../../data";
import store from "../../store";
import {truncStr} from "../../utilits";

function AnyOut({out=null, out2=null, outID, outID2, def='--', units, coef=-1, round=-1, notDecrease=false}) {

  if (outID === "status") {
    const statusDict = [ //справочник статусов
      "Выкл",
      "Работа",
      "Поддержка",
      "Розжиг",
      "Реверс"
    ];
    return (
      <>  {(out && out > -1) ? statusDict[out] : "Не в сети"}  </>
    )
  }

  if (outID === 'setsOnGV' || outID === 'setsOnKomn') {
    return (
      <>{(out > 0) ? 'Вкл' : 'Выкл' }</>
    )
  }

  if (outID === "lastOnlineTime") {
    if (+out <= 0) {
      return (<>никогда</>)
    }
    const datetime = new Date(out * 1000);
    const h = datetime.getHours();
    const m = datetime.getMinutes();
    return (
      <>{`${datetime.getDate()}.${datetime.getMonth() + 1}.${datetime.getFullYear()} ${h}:${String(m).length < 2 ? '0' : ''}${m}`}</>
    )
  }

  coef = (coef === -1) ? data.coefDict[outID] || 1: coef;

  const fl = x => ( (x && x.toString().includes('.')) ? (x.toString().split('.').pop().length) : 0 );

  const fix = (round === -1) ? fl(coef) : round; 

  if (out===null) {
    out = "--";
  } else if (/^[-]?\d+$/.test(out)){
    out = out * coef;
    out = out.toFixed(fix);
    if (out.split(".")[0] === "-100" || out.split(".")[0] === "-127") {
      out = "--";
    } else if (outID === "shnekOrCurrent1" && store.getState().setsType === 1) {
      out = out.split(".")[0];
    }
  }

  if (outID2) {
    if (out2===null) {
      out2 = "--";
    } else if (/^[-]?\d+$/.test(out2)){
      out2 = out2 * coef;
      out2 = out2.toFixed(fix);
      if (out2.split(".")[0] === "-100" || out2.split(".")[0] === "-127") {
        out2 = "--";
      } 
    }
  }

  const style = {};
  if (outID2) {
    style['display'] = 'flex';
  }

  return (
    <span style={style}> 
      <span>{(out && +out !== -127 && +out !== -100) ? truncStr(out,30) : def}
      <span className="widget__text_normal">{units}</span> </span>
      {outID2 && 
      <span className='widget__text_left-border'><span className="widget__text_normal" style={{fontSize: "2rem"}}></span>
      {(out2 && +out2 !== -127 && +out2 !== -100) ? out2 : def}
      <span className="widget__text_normal">{units}</span></span>}
    </span> 
  )
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    out: state['setsForSend'][ownProps.outID] || state[ownProps.outID],
    out2: ownProps.outID2 ? state['setsForSend'][ownProps.outID2] || state[ownProps.outID2] : null,
  }
}

export default connect(mapStateToProps)(AnyOut)