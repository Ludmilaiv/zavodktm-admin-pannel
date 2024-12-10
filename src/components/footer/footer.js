import Menu from '../menu';

const Footer = ({showActivePage, activePage}) => {
  if (localStorage.getItem("admin") && !(activePage==="devices" || activePage==="profile")) {

    return (
      <div className="footer footer_position">
        <Menu showActivePage={showActivePage}/>
      </div>
    )
  } else {
    return (
      <div className="footer footer_position">
               
      </div>
    )
  }
}

export default Footer