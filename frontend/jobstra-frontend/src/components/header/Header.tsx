import Logo from "../../assets/jobstra-logo-blue-dark.png";
import Navbar from "../navbar/Navbar";

const Header = () => {
  return (
    <div className='header'>
        <div className='header__logo-container'>
          <img className='header__logo-container__img' src={Logo} />
        </div>
        <div className="header__navbar">
          <Navbar />
        </div>
        
        <div className='header__user-info'>
            <button className='header__user-info__btn--login'>LOGIN</button>
            <button className='header__user-info__btn--signup'>CREATE ACCOUNT</button>
        </div>
    </div>
  )
}

export default Header