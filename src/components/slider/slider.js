import { Direction, Range } from 'react-range';
import { connect } from 'react-redux';
import Button from "../button";
import store from '../../store';
import classNames from 'classnames';

const Slider = ({classPrefix=null, value, outID, min, max}) => {
  function setData(val) {
    store.getState().functionSendSettings(outID, val);
  }

  if (value === null) {
    return <></>
  }

  return (
    <div className={classNames("slider", "slider_position", classPrefix && "slider_" + classPrefix)}>
      <Button buttonSpan="−" addClass="slider__button" type="slide" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={()=>{
        if (Number(value) > min) {
          setData(Number(value) - 1);
        }
      }}/>
      <Range
        direction={classPrefix ? Direction.Up: Direction.Right}
        step={1}
        min={min}
        max={max}
        values={(value < min) ? [min] : ((value > max) ? [max] : [value])}
        onChange={(val) => setData(val)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              width: classPrefix ? '7px' : '',
              height: classPrefix ? '70%' : '7px',
              flexGrow: '1',
              marginLeft: !classPrefix ? '7px' : '',
              marginRight: !classPrefix ? '7px' : '',
              marginTop: classPrefix ? '7px' : '',
              marginBottom: classPrefix ? '7px' : '',
              backgroundColor: '#fff'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: classPrefix ? '15px' : '25px',
              width: classPrefix ? '25px' : '15px',
              backgroundColor: '#000',
              border: '1px solid white',
              outline: 'none'
            }}
          />
        )}
      />
      <Button buttonSpan="+" addClass="slider__button" type="slide" onClick={()=>{
        if (Number(value) < max) {
          setData(Number(value) + 1);
        }
      }}/>
    </div>
    
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    value: state['setsForSend'][ownProps.outID] || state[ownProps.outID],
  }
}

export default connect(mapStateToProps)(Slider)