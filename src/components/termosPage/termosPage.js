import Widget from "../widget";
import store from "../../store";
import { useEffect } from "react";

const TermosPage = (props) => {
  const getData = store.getState().funcGetData;
  useEffect(() => {
    const getDataInterval = setInterval(getData,3000)
    return function cleanup() {
      clearInterval(getDataInterval);
    }
  });
  
  getData();
  return (
    <div className="content__page">
      <Widget typeClass="termos"/>
    </div>
  )
}

export default TermosPage