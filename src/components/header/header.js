const Header = ({title}) => {
  return <div className="header header_layout header_flex">
          <img className="header__logo" src="logo512.png" alt="logo"/>
          <div className="header__content">
            <div className="header__title">{title}</div>
          </div>
        </div>
}

export default Header