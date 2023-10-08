import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { validateEmailHandler, validatePasswordHandler } from "../../services/validation/inputValidation";
import { useDispatch } from "react-redux";
import { authorize } from "../../store/authSlice";
import { useState } from "react";
import { loginUser } from "../../services/api/userApi";
import { isErrorResponse } from "../../interfaces/Response";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useInput((value) => validateEmailHandler(value));
    const password = useInput((value) => validatePasswordHandler(value));
    const [auth, setAuth] = useState({hasError: false, message: ""});
    const emailOnChangeHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setAuth({hasError: false, message: ""});
        const target = event.target as HTMLInputElement;
        email.setValue(target.value);
        email.validate(target.value);
    };

    const passwordOnChangeHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setAuth({hasError: false, message: ""});
        const target = event.target as HTMLInputElement;
        password.setValue(target.value);
        password.validate(target.value);
    };

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setAuth({hasError: false, message: ""});
        email.setIsTouched(true);
        password.setIsTouched(true);
        if (!email.isValid || !password.isValid) {
            return;
        }

        const userLoginData = {
            email: email.value,
            password: password.value,
        };

        const data = await loginUser(userLoginData);

        if(isErrorResponse(data)) {
            setAuth({hasError: true, message: data.message});
            return;
        }
        navigate("/");
        dispatch(authorize(data.username));
    };

    return (
        <div className="login">
            <form onSubmit={submitHandler} className="login-form">
                <h1 className="login-form__title">Login</h1>
                <div className="login-form__input-container">
                    <label htmlFor="email" className="login-form__label">
                        Email
                    </label>
                    <input className="login-form__input" name="email" id="email" type="email" onChange={emailOnChangeHandler} />
                    {!email.isValid && email.isTouched && <p className="login-form__error-message">Invalid email.</p>}
                </div>
                <div className="login-form__input-container">
                    <label htmlFor="password" className="login-form__label">
                        Password
                    </label>
                    <input className="login-form__input" name="password" id="password" type="password" onChange={passwordOnChangeHandler} />
                    {!password.isValid && password.isTouched && <p className="login-form__error-message">Password must be at least 8 characters.</p>}
                </div>
                {auth.hasError && <p className="login-form__error-message--bold">{auth.message || "An error occured while logging in."}</p>}
                <button className="login-form__btn-submit">Login</button>
                <p className="login-form__message__forgot-password">Forgot password ?</p>
            </form>
            <p className="login__message-register">
                Don't have an account?{" "}
                <Link to="/register" className="login__message-register--link">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
