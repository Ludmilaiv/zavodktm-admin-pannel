import DeviceDetailPage from "../deviceDetailPage";
import DeviceInfoPage from "../deviceInfoPage";
import AuthorPage from "../authorPage";
import DevicesPage from "../devicesPage";
import Loading from "../loading";
import ConfirmPage from "../confirmPage";
import ErrorPopup from "../errorPopup";
import BurgerMenu from "../burgerMenu";
import AllDevicesPage from "../allDevicesPage";

const Content = ({userName, role, showActivePage, outPageTitle, activePage, pageTitle}) => {
  return (
    <div className="content content_position">
      {(activePage!=="author" && activePage!=="reg" && activePage!=="authorHelp") && <div className="content__menu-block">       
        <BurgerMenu userName={userName} role={role} showActivePage={showActivePage} activePage={activePage}/>
      </div>}
      <div className="content__main-block">
        <h2 className="content__title">{pageTitle}</h2>
        {activePage==="author"||activePage==="reg"||activePage==="authorHelp"?(<AuthorPage showActivePage={showActivePage} activePage={activePage}/>):
            (activePage==="deviceDetail"?(<><DeviceDetailPage outPageTitle={outPageTitle} /><ErrorPopup showActivePage={showActivePage}/></>):(
              activePage==="deviceInfo"?(<><DeviceInfoPage pageTitle={pageTitle} /><ErrorPopup showActivePage={showActivePage}/></>) : (
                activePage==="devices"?(<DevicesPage showActivePage={showActivePage}/>): (
                  activePage==="alldevices" || activePage==="adddevices" ?(<AllDevicesPage role={role} showActivePage={showActivePage}/>) : (
                    activePage === 'loading' ? (<Loading/>) : (
                      activePage === 'confirm' ? (<ConfirmPage/>) : ''
                    )
                  )
                )
              )
            )
          )
        }
      </div>

       
        
    </div>
  )
}

export default Content