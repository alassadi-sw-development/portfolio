import React from "react"
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import avatarIcon from "../assets/images/avatar-icon.png"

export default function Header({isLoggedIn, handleLogOutStatus}) {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const navigate = useNavigate()

    function logOut() {
        handleLogOutStatus()
        localStorage.removeItem("loggedin")
        navigate("/")
    }
    console.log(isLoggedIn);

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink
                    to="/host"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                {!isLoggedIn ? <Link to="login" className="login-link">
                    <img 
                        src={avatarIcon} 
                        className="login-icon"
                    />
                </Link> :
                <button className="log-out" onClick={logOut}>Log Out</button>}
            </nav>
        </header>
    )
}