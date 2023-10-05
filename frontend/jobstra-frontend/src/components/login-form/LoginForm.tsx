import { Link, useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { validateEmailHandler, validatePasswordHandler } from '../../services/validation/inputValidation'
import { useDispatch } from 'react-redux'
import { authorize } from '../../store/authSlice'
import { useState } from 'react'

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useInput((value) => validateEmailHandler(value));
  const password = useInput((value) => validatePasswordHandler(value));
  const [authError, setAuthError] = useState(false);
  const emailOnChangeHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setAuthError(false);
    const target = event.target as HTMLInputElement;
    email.setValue(target.value);
    email.validate(target.value);
  }

  const passwordOnChangeHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setAuthError(false);
    const target = event.target as HTMLInputElement;
    password.setValue(target.value);
    password.validate(target.value);
  }

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setAuthError(false);
    email.setIsTouched(true);
    password.setIsTouched(true);
    if(!email.isValid || !password.isValid) {
      return;
    }

    const userLogin = {
      email: email.value,
      password: password.value,
    };

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLogin)
    });

    const data: {isAuthenticated: boolean, message: string, username: string} = await response.json();

    if(data.isAuthenticated) {
      navigate("/");
      dispatch(authorize(data.username));
    } else {
      setAuthError(true);
    }
  }

  return (
    <div className='login'>
        <form onSubmit={submitHandler} className='login-form'>
            <h1 className='login-form__title'>Login</h1>
            <div className='login-form__input-container'>
                <label htmlFor="email" className='login-form__label'>Email</label>
                <input className="login-form__input" name="email" id="email" type="email" onChange={emailOnChangeHandler}/>
                {!email.isValid && email.isTouched && <p className="login-form__error-message">Invalid email.</p>}
            </div>
            <div className='login-form__input-container'>
                <label htmlFor="password" className='login-form__label'>Password</label>
                <input className="login-form__input" name="password" id="password" type="password" onChange={passwordOnChangeHandler}/>
                {!password.isValid && password.isTouched && <p className="login-form__error-message">Password must be at least 8 characters.</p>}
            </div>
            {authError && <p className="login-form__error-message--bold">Invalid email or password.</p>}
            <button className='login-form__btn-submit'>Login</button>
            <p className='login-form__message__forgot-password'>Forgot password ?</p>
        </form>
        <p className='login__message-register'>Don't have an account? <Link to="/register" className='login__message-register--link'>Register</Link></p>
    </div>
  )
}

export default LoginForm