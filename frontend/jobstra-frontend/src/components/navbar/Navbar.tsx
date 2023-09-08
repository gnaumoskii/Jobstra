import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="nav">
        <NavLink className={"nav__link"}  to="/" draggable="false">Applications</NavLink>
        <NavLink className="nav__link" to="/interviews" draggable="false">Interviews</NavLink>
        <NavLink className="nav__link" to="/about" draggable="false">About</NavLink>
    </nav>
  )
}

export default Navbar