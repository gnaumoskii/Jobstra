import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import {validateUsernameHandler, validateEmailHandler, validatePasswordHandler } from "../../services/validation/inputValidation";
import { createUser } from "../../services/api/userApi";
import User from "../../interfaces/User";

const RegisterForm = () => {
    const username = useInput((value) => validateUsernameHandler(value));
    const email = useInput((value) => validateEmailHandler(value));
    const password = useInput((value) => validatePasswordHandler(value));
    const confirmPassword = useInput((value) => validatePasswordHandler(value));
    

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        username.setIsTouched(true);
        email.setIsTouched(true);
        password.setIsTouched(true);
        confirmPassword.setIsTouched(true);

        if(!username.isValid || !email.isValid || !password.isValid || !confirmPassword.isValid) {
            return;
        }

        const user: Partial<User> = {
            username: username.value,
            email: email.value,
            password: password.value
        } ;
        const createdUser = await createUser(user);
        console.log(createdUser);
    };

    const usernameOnChangeHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        username.setValue(target.value);
        username.validate(target.value);
    };

    const emailOnChangeHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        email.setValue(target.value);
        email.validate(target.value);
    };
    const passwordOnChangeHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        password.setValue(target.value);
        password.validate(target.value);
    };

    const confirmPasswordOnChangeHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        confirmPassword.setValue(target.value);
        confirmPassword.setIsValid(target.value === password.value);
    }

    return (
        <div className="register">
            <form onSubmit={submitHandler} className="register-form">
                <h1 className="register-form__title">REGISTER</h1>
                <div className="register-form__input-container">
                    <label htmlFor="username" className="register-form__label">
                        Username
                    </label>
                    <input
                        className="register-form__input"
                        autoComplete="off"
                        name="username"
                        id="username"
                        type="text"
                        value={username.value}
                        onChange={usernameOnChangeHandler}
                    />
                    {!username.isValid && username.isTouched && (
                        <p className="register-form__input-container__error-message">Username must be at least 4 characters.</p>
                    )}
                </div>
                <div className="register-form__input-container">
                    <label htmlFor="email" className="register-form__label">
                        Email
                    </label>
                    <input
                        className="register-form__input"
                        autoComplete="off"
                        name="email"
                        id="email"
                        type="email"
                        value={email.value}
                        onChange={emailOnChangeHandler}
                    />
                    {!email.isValid && email.isTouched && <p className="register-form__input-container__error-message">Invalid email.</p>}
                </div>
                <div className="register-form__input-container">
                    <label htmlFor="password" className="register-form__label">
                        Password
                    </label>
                    <input className="register-form__input" name="password" id="password" type="password" value={password.value} onChange={passwordOnChangeHandler} />
                    {!password.isValid && password.isTouched && <p className="register-form__input-container__error-message">Password must be at least 8 characters.</p>}
                </div>
                <div className="register-form__input-container">
                    <label htmlFor="password2" className="register-form__label">
                        Confirm Password
                    </label>
                    <input className="register-form__input" name="password2" id="password2" type="password" value={confirmPassword.value} onChange={confirmPasswordOnChangeHandler}/>
                    {!confirmPassword.isValid && confirmPassword.isTouched && <p className="register-form__input-container__error-message">Passwords do not match.</p>}
                </div>

                <button className="register-form__btn-submit">Create account</button>
            </form>
            <p className="register__message-register">
                Already have account?{" "}
                <Link to="/login" className="register__message-register--link">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
