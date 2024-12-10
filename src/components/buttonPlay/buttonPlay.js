import Button from "../button";
import { connect } from 'react-redux';
import store  from '../../store';
import { setTemp } from '../../actions';
import { useEffect } from "react";

let loadTimeout = null;

const ButtonPlay = ({addClass='button_play', setID, loading, changed, setVal, status=-1}) => {

  const setLoading = (value) => {
    const state = {};
    state[`loading_${setID}`] = value;
    state[`block_${setID}`] = value;
    if (value) state.changed = '1';
    store.dispatch(setTemp(state));
  }

  useEffect(()=>{
    if (+changed === 0) {
      clearTimeout(loadTimeout);
      loadTimeout = setTimeout(() => setLoading(false), 2000);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  const stopLoadingAfterDelay = () => {
    loadTimeout = setTimeout(() => setLoading(false), 50000);
  }

  const startStop = () => {
    if (loading || status === -1) return;
    clearTimeout(loadTimeout);
    setLoading(true);
    
    let set = 0;
    if (+setVal === 0 || +status === 0) {
      set = 1;
    }

    store.getState().functionSendSettings(setID, set);
    stopLoadingAfterDelay();
  }
  
  let buttonImg = '';
  let style = {};
  if (loading) {
    buttonImg = "images/spiner.gif";
  } else if (+status === -1) {
      buttonImg = "images/offline.png";
      style.backgroundColor = "rgb(105, 105, 105)";
    } else if (+setVal === 0 || +status === 0) {
      buttonImg = "images/play.png";
    } else {
      buttonImg = "images/stop.png";
      style.backgroundColor = "#ff8000";
    }
  const buttonSpan = <img className="button__img" src={buttonImg} alt="play"/>;

  return (
    <Button buttonSpan={buttonSpan} type="play" addClass={addClass} style={style} onClick={startStop} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    status: state.status,
    setVal: state[ownProps.setID],
    loading: state[`loading_${ownProps.setID}`],
    changed: state['changed'],
  }
}

export default connect(mapStateToProps)(ButtonPlay)