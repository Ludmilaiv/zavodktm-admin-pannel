import Widget from "../widget";
import { useEffect } from "react";
import store from "../../store";
import { setTemp } from '../../actions';

const AllDevicesPage = ({showActivePage, role}) => {

  useEffect(() => {
    store.dispatch(setTemp({devType: 0}))
  }, [])

  return (
    <div className="content__page">
      <Widget typeClass={+role === 1 ? "alldevices" : "adddevices"} showActivePage={showActivePage}/>
    </div>
  )
}

export default AllDevicesPage