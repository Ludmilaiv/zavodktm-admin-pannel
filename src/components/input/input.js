import { connect } from 'react-redux';
import store from '../../store';

const Input = ({value, outID}) => {
  function setData(val) {
    store.getState().functionSendSettings(outID, val);
  }

  return (
    <input className="input" value={value} onChange={(e) => setData(e.target.value)}/>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    value: state['setsForSend'][ownProps.outID] || state[ownProps.outID],
  }
}

export default connect(mapStateToProps)(Input)