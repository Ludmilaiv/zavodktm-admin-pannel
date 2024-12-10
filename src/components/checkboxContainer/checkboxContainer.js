import { connect } from 'react-redux';
import store  from '../../store';
import { useState, useEffect } from "react";


const CheckboxContainer = ({setID, setVal=0, setVal1, items, uncheck=true, id}) => {
  const [newVal,setNewVal] = useState(null);

  useEffect(() => {
    setNewVal(null);
  },[setVal]) 

  function setData(val) {
    store.getState().functionSendSettings(setID, val);
  }

  if (setVal === null || setVal > items.length) {
    return <>--</>
  }

  const setCheck = value => {
    if (!uncheck && Number(setVal) === Number(value)) return;
    if (uncheck && Number(setVal) !== 0) {
      setNewVal(0);
      setData(0);
    } else {
      setNewVal(value);
      setData(value);
    }
  }
  
  return (
    <div className="checkbox-container checkbox-container__position">
      {items.map(item => (
        <div className="checkbox-container__item" key={item.id}>
          <div className="checkbox" onClick={() => setCheck(item.value)}>
            {((newVal !== null && +newVal === +item.value) 
            || (newVal === null && +setVal === +item.value)) ? <span>&#10003;</span> : ''}
          </div>
          <div className="checkbox__label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    setVal: state[ownProps.setID],
  }
}

export default connect(mapStateToProps)(CheckboxContainer)