import { Link } from "react-router-dom";
import Logo from "../../assets/jobstra-logo-blue-dark3.png";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { disauthorize } from "../../store/authSlice";
import { logoutUser } from "../../services/api/userApi";
const Header = () => {
  const {isAuthorized, username} = useSelector((state: RootState) => state.auth);
  
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await logoutUser();
    dispatch(disauthorize());
  }

  return (
    <div className='header'>
        <div className='header__logo-container'>
          <img className='header__logo-container__img' src={Logo} draggable="false"/>
        </div>
        <div className="header__navbar">
          <Navbar />
        </div>
        
          <div className='header__user-info'>
            {!isAuthorized &&
            <>
              <Link to="/login" className='header__user-info__btn--login'>LOGIN</Link>
              <Link to="/register" className='header__user-info__btn--signup'>CREATE ACCOUNT</Link>
              </> 
            }
            {isAuthorized && 
            <>
            <p className="header__user-info__username">Welcome, <span className="header__user-info__username-value">{username}</span>.</p>
            <button className='header__user-info__btn--logout' onClick={logoutHandler}>LOGOUT</button>
            </>
            }
          </div>
        
        

        
    </div>
  )
}

export default Header