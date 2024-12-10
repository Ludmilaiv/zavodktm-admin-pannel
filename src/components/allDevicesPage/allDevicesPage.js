import Widget from "../widget";
import { useEffect } from "react";
import store from "../../store";
import { setTemp } from '../../actions';

const AllDevicesPage = ({showActivePage}) => {

  useEffect(() => {
    store.dispatch(setTemp({devType: 0}))
  }, [])

  return (
    <div className="content__page">
      <Widget typeClass="alldevices" showActivePage={showActivePage}/>
    </div>
  )
}

export default AllDevicesPage