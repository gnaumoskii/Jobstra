import { Link } from "react-router-dom"

const AuthPrompt= () => {

  return (
    <div className='auth-prompt'>
      <p className='auth-prompt__message'>To view your applications <Link to="/login" className='auth-prompt__message__login-button'>click here to login.</Link></p>
    </div>
  )
}

export default AuthPrompt