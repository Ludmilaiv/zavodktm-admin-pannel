import Button from "../button";
import { connect } from 'react-redux';
import store  from '../../store';
import { setTemp } from '../../actions';
import { useEffect } from "react";

const ButtonOnOff = ({setID, setVal=0, status=-1, changed, loading=false}) => {

  const setLoading = (value) => {
    const state = {};
    state[`loading_${setID}`] = value;
    state[`block_${setID}`] = value;
    if (value) state.changed = '1';
    store.dispatch(setTemp(state));
  }

  let loadTimeout = null;

  useEffect(()=>{
    if (+changed === 0) {
      clearTimeout(loadTimeout);
      setLoading(false);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  const stopLoadingAfterDelay = () => {
    loadTimeout = setTimeout(() => setLoading(false), 30000);
  }
  const onOff = () => {
    if (loading || status === -1) return;
    setLoading(true);
    let set = 0;
    if (+setVal === 0) {
      set = 1;
    }

    store.getState().functionSendSettings(setID, set);
    stopLoadingAfterDelay();
  }

  let buttonImg = '';
  let style = {};
  const addClass = 'button_play';
  if (loading) {
    buttonImg = "images/spiner.gif";
  } else if (+status === -1) {
      buttonImg = "images/offline.png";
      style.backgroundColor = "#696969";
    } else if (+setVal === 0) {
      buttonImg = "images/power.png";
    } else {
      buttonImg = "images/power.png";
      style.backgroundColor = "#ff8000";
    }
  
  const buttonSpan = <span><img className="button__img" src={buttonImg} alt="play"/></span>;

  return (
    <Button buttonSpan={buttonSpan} type="play" addClass={addClass} style={style} onClick={onOff} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    status: state.status,
    setVal: state[ownProps.setID],
    loading: state[`loading_${ownProps.setID}`],
    changed: state['changed']
  }
}

export default connect(mapStateToProps)(ButtonOnOff)