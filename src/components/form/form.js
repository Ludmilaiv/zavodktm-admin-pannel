import Button from "../button";
import data from "../../data";
import { useState } from 'react';
import axios from 'axios';

const Form = ({showActivePage, activePage}) => {

  const [login, setLogin] = useState("");
	const [password, setPass] = useState("");
	const [password2, setPass2] = useState("");
  const [email, setEmail] = useState("");
  const [recovery, setRecovery] = useState("");
  const [errorMessage, setErrorMes] = useState("");
  const [errLogin, setErrLogin] = useState("");
  const [errPass, setErrPass] = useState("");
  const [errPass2, setErrPass2] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errRecover, setErrRecover] = useState("");

  function register(login,password,password2,email) {
    setErrorMes("");
    setErrLogin("");
    setErrPass("");
    setErrPass2("");
    setErrEmail("");
    setErrRecover("")
    if (!(login && password && password2 && email)) {
      setErrorMes("Заполните все поля");
      if (!login) {
        setErrLogin("form__input_err");
      }
      if (!password) {
        setErrPass("form__input_err");
      }
      if (!password2) {
        setErrPass2("form__input_err");
      }
      if (!email) {
        setErrEmail("form__input_err");
      }
    } else {
      if (!/\S+@\S+\.\S+/.test(email)) {
        setErrorMes("Неверный формат адреса электронной почты");
        setErrEmail("form__input_err");
      } else if (!(/^[A-Za-z0-9]+$/i.test(login))) {
        setErrorMes("Логин может состоять только из латинских букв и цифр");
        setErrLogin("form__input_err");
      } else if (!(/^[A-Za-z0-9*&!.+$%@-]+$/i.test(password))) {
        setErrorMes("Пароль может состоять только из латинских букв, цифр и знаков *&!.+-$%@");
        setErrPass("form__input_err");
      } else if (password.length < 5) {
        setErrorMes("Пароль слишком короткий");
        setErrPass("form__input_err");
      } else if (password !== password2) {
        setErrorMes("Пароль продублирован неверно");
        setErrPass2("form__input_err");
      } else {
        let user = {login, email, password, password2};
        setErrorMes("Подождите...");
        axios.post(data.regURL, user)
          .then(function (response) {
            if (typeof response.data === "object" && response.data['user']) {
              localStorage.setItem("admin", response.data['user']);
              localStorage.setItem("admintoken", response.data['token']);
              if (localStorage.getItem(response.data['user'] + "defaultDevice")) {
                showActivePage("home","Имя устройства");
              } else {
                showActivePage("devices", "Устройства");
              }
            } else {
              if (response.data === "err2") {
                setErrorMes("Пользователь с таким именем уже существует");
                setErrLogin("form__input_err");
              } else {
                setErrorMes("Что-то пошло не так. Попробуйте позже");
                console.log(response.data);
              }
            }  
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

  function author(login,password) {
    setErrorMes("");
    setErrLogin("");
    setErrPass("");
    setErrPass2("");
    setErrEmail("");
    setErrRecover("");
    if (!(login && password)) {
      setErrorMes("Заполните все поля");
      if (!login) {
        setErrLogin("form__input_err");
      }
      if (!password) {
        setErrPass("form__input_err");
      }
    } else {
      let user = {login, password};
      setErrorMes("Подождите...");
      axios.post(data.authURL, user)
          .then(function (response) {
          if (typeof response.data === "object" && response.data['user']) {
              localStorage.setItem("admin", response.data['user']);
              localStorage.setItem("admintoken", response.data['token']);
              if (localStorage.getItem(response.data['user'] + "defaultDevice")) {
                showActivePage("home","Имя устройства");
              } else {
                showActivePage("devices", "Устройства");
              }
            } else {
              if (response.data === "err1") {
                setErrorMes("Неверное имя пользователя или пароль");
                setErrLogin("form__input_err");
                setErrPass("form__input_err");
              } else {
                if (response.data === "err2") {
                  setErrorMes("У данного пользователя нет прав доступа к панели администратора");
                  setErrLogin("form__input_err");
                  setErrPass("form__input_err");
                } 
                else {
                  setErrorMes("Что-то пошло не так. Попробуйте позже");
                  console.log(response.data);
                }
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }

  function recoveryPass(recovery) {
    setErrorMes("Подождите...");
    setErrLogin("");
    setErrPass("");
    setErrPass2("");
    setErrEmail("");
    if (!(recovery)) {
      setErrorMes("Заполните поле");
      setErrRecover("form__input_err");
    } else  if (!/\S+@\S+\.\S+/.test(recovery)) {
      setErrorMes("Неверный формат адреса электронной почты");
      setErrRecover("form__input_err");
    } else {
      let user = { recovery };
      axios.post(data.recoveryPassURL, user)
          .then(function (response) {
            if (response.data === 200) {
              setErrorMes(`На ${recovery} отправлена ссылка для восстановления пароля`);
            } else {
              if (response.data === "err1") {
                setErrorMes("Пользователь с указанным адресом не найден");
                setErrRecover("form__input_err");
              } else {
                setErrorMes("Что-то пошло не так. Попробуйте позже");
                console.log(response.data);
              }
            }  
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }
  
  function handleChangeLogin(event) {
    setErrorMes("");
    setErrLogin("");
		setLogin(event.target.value);
	}
  function handleChangeEmail(event) {
    setErrorMes("");
    setErrEmail("");
		setEmail(event.target.value);
	}
  function handleChangePass(event) {
    setErrorMes("");
    setErrPass("");
		setPass(event.target.value);
	}
  function handleChangePass2(event) {
    setErrorMes("");
    setErrPass2("");
		setPass2(event.target.value);
	}
  function handleChangeRecovery(event) {
    setErrorMes("");
    setErrRecover("")
		setRecovery(event.target.value);
	}

  
  let formContent;
  switch (activePage) {
    case "author": {
      formContent = (
        <>
          <label htmlFor="login" className="form__label">Имя пользователя c правами администратора</label>
          <input value={login} className={`form__input ${errLogin}`} type="text" placeholder="Введите имя пользователя" name="login" required pattern="^[a-zA-Z0-9]+$" title="Только латинские буквы и цифры" onChange={handleChangeLogin}/>
          <label className="form__label" htmlFor="password">Пароль</label>
          <input value={password} className={`form__input ${errPass}`} type="password" placeholder="Введите пароль" name="password" required pattern="^[a-zA-Z0-9]+$" title="Только латинские буквы и цифры" onChange={handleChangePass}/>
          <div className="form__error">{errorMessage}</div>
          <Button addClass="form__button button_light" buttonSpan="Войти" type="submit" onClick={()=>{author(login,password,password2,email)}}/>
          <span onClick={()=>{goToAuthHelp(showActivePage)}}className="form__label form__link">Забыли пароль?</span>
        </>
      );
      break;
    }
    case "reg": {
      formContent = (
        <>
          <label htmlFor="email" className="form__label">Адрес электронной почты</label>
          <input value={email} className={`form__input ${errEmail}`} type="email" placeholder="Введите email" name="email" required onChange={handleChangeEmail}/>
          <label htmlFor="login" className="form__label">Имя пользователя</label>
          <input value={login} className={`form__input ${errLogin}`}type="text" placeholder="Введите имя пользователя" name="login" required pattern="^[a-zA-Z0-9]+$" title="Только латинские буквы и цифры" onChange={handleChangeLogin}/>
          <label className="form__label" htmlFor="password">Пароль</label>
          <input value={password} className={`form__input ${errPass}`}type="password" placeholder="Введите пароль" name="password" required pattern="^[a-zA-Z0-9]+$" title="Только латинские буквы и цифры" onChange={handleChangePass}/>
          <input value={password2} className={`form__input ${errPass2}`} type="password" placeholder="Повторите пароль" name="password" required pattern="^[a-zA-Z0-9]+$" title="Только латинские буквы и цифры" onChange={handleChangePass2}/>
          <div className="form__label form__error">{errorMessage}</div>
          <Button addClass="form__button button_light" buttonSpan="Зарегистрироваться" type="submit" onClick={()=>{register(login,password,password2,email)}}/>
          <span onClick={()=>{goToAuth(showActivePage)}} className="form__label form__link">Вернуться к входу</span>
        </>
      );
      break;
    }
    case "authorHelp": {
      formContent = (
        <>
          <label htmlFor="recovery" className="form__label">Адрес электронной почты, указанный при регистрации</label>
          <input value={recovery || email} className={`form__input ${errRecover}`} type="text" placeholder="Введите email" name="recovery" required onChange={handleChangeRecovery}/>
          <div className="form__error">{errorMessage}</div>
          <Button addClass="form__button button_light" buttonSpan="Восстановить" type="submit" onClick={()=>{recoveryPass(recovery)}}/>
          <span onClick={()=>{goToAuth(showActivePage)}} className="form__label form__link">Вернуться к входу</span>
        </>
      );
      break;
    }
    default: {
      break;
    }
  }

  function goToReg(showActivePage) {
    setErrorMes("");
    setErrLogin("");
    setErrPass("");
    setErrPass2("");
    setErrEmail("");
    setErrRecover("");
    showActivePage("reg", "Регистрация")
  }
  function goToAuth(showActivePage) {
    setErrorMes("");
    setErrLogin("");
    setErrPass("");
    setErrPass2("");
    setErrEmail("");
    setErrRecover("");
    showActivePage("author", "Вход")
  }
  function goToAuthHelp(showActivePage) {
    setErrorMes("");
    setErrLogin("");
    setErrPass("");
    setErrPass2("");
    setErrEmail("");
    setErrRecover("");
    showActivePage("authorHelp", "Восстановление пароля")
  }

  return (
    <div className="form form_flex">
      {formContent}
    </div>
    
  )
  
}

export default Form