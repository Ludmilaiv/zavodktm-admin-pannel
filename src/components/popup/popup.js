import Button from "../button";
import { useEffect } from "react";

const Popup = ({text, time=0, popupShow, startProcess, stopProcess, popupOK, info=false, error=false}) => {
  if (!error)  {
    stopProcess();
  }

  const close = () => {
    popupShow(false); 
    startProcess();
  }

  useEffect(() => {
    let showTimeout;
    if (time > 0) {
      showTimeout = setTimeout(close,time)
    }
    return function cleanup() {
      clearTimeout(showTimeout);
    }
  });
  
    return (
      <div className="popup popup_position" onClick={
        (e)=>{ 
          if (e.target.className === "popup popup_position") {
            popupShow(false); 
            if (!error) {
              startProcess()
            }
          }
          
        }
      }>
        <div className="popup__box">
          <div className="popup__text">
            {text}
          </div>
          <span className="popup__exit" onClick={
            ()=>{ 
              popupShow(false); 
              if (!error) {
                startProcess()
              }
            }
          }></span>
          {info?"":
          <>
            <Button addClass="popup__button" type="popup" buttonSpan="Да" onClick={()=>{popupOK()}}/>
            <Button addClass="popup__button" type="popup" buttonSpan="Отменить" onClick={()=>{popupShow(false); startProcess()}}/>
          </>
          }
          
        </div>
      </div>
    ) 
}

export default Popup