import Button from "../button";
import data from "../../data";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Confirm = () => {

  const [errorMessage, setErrorMes] = useState("");
  const [repeatTimer, setRepeatTimer] = useState(0);

  useEffect(() => {
    if (repeatTimer > 0) {
      setTimeout(() => setRepeatTimer(repeatTimer - 1), 1000);
    }
  }, [repeatTimer])

  function confirm(e) {
    e.preventDefault();
    if (repeatTimer > 0) return;
    setRepeatTimer(10);
    setErrorMes("");
    setErrorMes("Подождите...");
    const userId = localStorage.getItem('admin');
    if (!userId) return;
    axios.post(data.confirmURL, {user_id: userId})
        .then(function (response) {
        if (typeof response.data === "object" && response.data['email']) {
           setErrorMes(`На адрес электронной почты ${response.data['email']} отправлен запрос на подтверждение`);
        } else {
          setErrorMes("Что-то пошло не так. Попробуйте позже");
          console.log(response.data);
        }
        })
        .catch(function (error) {
          setErrorMes("Что-то пошло не так. Попробуйте позже");
          console.log(error);
        });
    }
  
  return (
    <>
      <p className="widget__text">Для использования аккаунта необходимо подтвердить адрес электронной почты</p>
      <Button style={{opacity: repeatTimer > 0 ? '0.7' : 1, maxWidth: '70%'}} onClick={confirm} addClass="widget__button" buttonSpan={repeatTimer === 0 ? "Подтвердить" : `Повторно отправить можно через ${repeatTimer} сек.`} />
      <p className="widget__text widget__text_small">{ errorMessage }</p>
    </>
    
  )
  
}

export default Confirm