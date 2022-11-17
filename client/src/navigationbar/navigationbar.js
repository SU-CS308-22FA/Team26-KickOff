import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Button } from "@mui/material"
import { logout } from "../actions/userActions"

export default function Navbar() {
    const history = useNavigate()
    const [username, setUsername] = useState(null)


    useEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? setUsername(data.username) : null)
    }, [])
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                KickOff
        </Link>
            {username
                ? <div>
                    <div onClick={logout}>Logout</div>
                </div>
                : <ul>
                    <CustomLink to="/login">
                        Login
            </CustomLink>
                    <CustomLink to="/signup">
                        Sign Up
            </CustomLink>
            <Button onClick = {logout}>Logout</Button>
                </ul>
            }
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}
            </Link>
        </li>
    )
}
