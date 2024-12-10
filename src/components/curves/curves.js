import { LineChart } from "@mui/x-charts";
import Box from '@mui/material/Box';
import * as React from 'react';
import Slider from '@mui/material/Slider';
import { useState } from "react";
import store from "../../store";
import { useEffect } from "react";
import { connect } from 'react-redux';

const Curves = ({statistic}) => {

  const [endDate, setEndDate] = useState();
  const [xDataValues, setXDataValues] = useState([]);
  const [xDataLimits, setXDataLimits] = useState([null, null]);
  const [propList, setPropList] = useState([1,2,3]);
  const [data, setData] = useState({data1: [], data2:[], data3:[]});
  const [marks, setMarks] = useState([]);
  useEffect(() => {
    if (!statistic || !endDate) return;
    let beginDate = new Date(endDate);
    beginDate.setTime(beginDate.getTime() - statistic['lt']*60*60*1000);
    const xDataValuesTemp = [];
    const data1 = [];
    const data2 = [];
    const data3 = [];
    let stat = [];
    for (let i in statistic['stat']) {
      stat.unshift({
        datetime: new Date((statistic['stat'][i]['datetime']) * 1000), 
        t2: statistic['stat'][i]['t2'] / 10,
        t10: statistic['stat'][i]['t10'],
        s2: statistic['stat'][i]['s2'],
      });
    };
    if (stat.length === 0 || stat[0]['datetime'] < beginDate) {
      setXDataValues([]);
      setData({data1: [], data2:[], data3:[]});
      setXDataLimits([null,null])
      return;
    }
    const marksTemp = [];
 
    let currentDate = new Date(stat[0]['datetime']);
    let h = currentDate.getHours();
    let m = currentDate.getMinutes();
    xDataValuesTemp.unshift(`${currentDate.getDate()}.${currentDate.getMonth() + 1} ${h}:${String(m).length < 2 ? 0 : ''}${m}`);
    data1.unshift(stat[0]['s2']);
    data2.unshift(stat[0]['t2']);
    data3.unshift(stat[0]['t10']);

    let i = 1;
    while (currentDate >= beginDate) {
      currentDate.setTime(currentDate.getTime() - statistic['dt']*60*1000);
      let h = currentDate.getHours();
      let m = currentDate.getMinutes();
      xDataValuesTemp.unshift(`${currentDate.getDate()}.${currentDate.getMonth() + 1} ${h}:${String(m).length < 2 ? 0 : ''}${m}`);
      if (i > stat.length - 1 || Math.abs(Math.round((currentDate - stat[i]['datetime']) / (1000 * 60))) >=  statistic['dt']) {
        data1.unshift(null);
        data2.unshift(null);
        data3.unshift(null);
      }
      else {
        data1.unshift(stat[i]['s2']);
        data2.unshift(stat[i]['t2']);
        data3.unshift(stat[i]['t10']);
        const n = data1.length;
        if (n > 2) {
          if (data1[1] === null && data1[2] !== null && data1[0] !== null) {
            data1[1] = Math.round((+data1[0] + +data1[2]) / 2);
          }
          if (data2[1] === null && data2[2] !== null && data2[0] !== null) {
            data2[1] = Math.round((+data2[0] + +data2[2]) / 2);
          }
          if (data3[1] === null && data3[2] !== null && data3[0] !== null) {
            data3[1] = Math.round((+data3[0] + +data3[2]) / 2);
          }
        }
       
        i++;
      }     
    }

    currentDate = new Date(stat[0]['datetime']);
    while (currentDate <= endDate) {
      currentDate.setTime(currentDate.getTime() + 5*60*1000);
      if (currentDate > endDate) break;
      let h = currentDate.getHours();
      let m = currentDate.getMinutes();
      xDataValuesTemp.push(`${currentDate.getDate()}.${currentDate.getMonth() + 1} ${h}:${String(m).length < 2 ? 0 : ''}${m}`);
      data1.push(null);
      data2.push(null);
      data3.push(null);
    }

    xDataValuesTemp.forEach((x, i) => {
      if (i % (statistic['lt'] * Math.floor(60 / statistic['dt'] / 5)) === 0) {
        marksTemp.push({value: i, label: x});
      }
      
    })

    setXDataValues(xDataValuesTemp);
    if (xDataLimits[0] === null && xDataLimits[1] === null) {
         setXDataLimits([xDataValuesTemp.length >= 13 ? xDataValuesTemp.length - 13 : 0, xDataValuesTemp.length - 1]);
    }
 
    setMarks(marksTemp);
    setData({data1, data2, data3});

  }, [statistic])

  const minDistance = 1;

  useEffect(() => {
    const getNewStatistic = () => {
      setEndDate(new Date());
      store.getState().getStatistic();
    }
    setTimeout(getNewStatistic, 5000);
    const interval = setInterval(getNewStatistic, 60000);
    return () => clearInterval(interval);
  }, [])

  if (!statistic) return <>Подождите...</>;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], xDataValues.length - 1 - minDistance);
        setXDataLimits([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setXDataLimits([clamped - minDistance, clamped]);
      }
    } else {
      setXDataLimits(newValue);
    }
  };

  const series = [];
  if (propList.includes(1)) {
    series.push({
      data: data.data1.slice(xDataLimits[0], xDataLimits[1] + 1),
      label: 'Установленная температура ЦО °С',
      color: 'green'
    });
  }
  if (propList.includes(2)) {
    series.push({
      data: data.data2.slice(xDataLimits[0], xDataLimits[1] + 1),
      label: 'Текущая температура ЦО °С',
      color: 'blue'
    });
  }
  if (propList.includes(3)) {
    series.push({
      data: data.data3.slice(xDataLimits[0], xDataLimits[1] + 1),
      label: 'Мощность вентилятора %',
      color: 'red'
    });
  }

  const propListChange = (e) => {
    if (e.target.checked) {
      setPropList([...propList, +e.target.value]);
     } else {
      const tempPropList = [...propList];
      tempPropList.splice(tempPropList.indexOf(+e.target.value), 1);
      setPropList(tempPropList);
    }
      
  }

  return <div className="curves">
    <Box>
      <LineChart
        xAxis={[{ scaleType: 'point', data: xDataValues.slice(xDataLimits[0], xDataLimits[1] + 1) }]}
        series={series}
        height={600}
        grid={{ vertical: true, horizontal: true }}
        margin={{ top: 90, bottom: 40 }}
      />
      <div className="curves__controls">
        <Slider
          value={xDataLimits}
          onChange={handleChange}
          min={0}
          max={xDataValues.length - 1}
          valueLabelDisplay="off"
          getAriaLabel={()=>''}
          marks={marks}
        />
      </div>
      <div className="curves__controls">
        <label className="curves__label">
          <input value={1} checked={propList.includes(1)} className="curves__checkbox" type="checkbox" onChange={propListChange} />
          Установленная температура ЦО °С
        </label>
        <label className="curves__label">
          <input value={2} checked={propList.includes(2)} className="curves__checkbox" type="checkbox" onChange={propListChange}/>
          Текущая температура ЦО °С
        </label>
        <label className="curves__label">
          <input value={3} checked={propList.includes(3)} className="curves__checkbox" type="checkbox" onChange={propListChange}/>
          Мощность вентилятора %
        </label>
      </div>
    </Box>
  </div>
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    statistic: state['statistic'],
  }
}

export default connect(mapStateToProps)(Curves)