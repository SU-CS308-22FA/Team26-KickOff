import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Button } from "@mui/material"
import { logout } from "../actions/userActions"
import { useDispatch, useSelector} from "react-redux";

export default function Navbar() {
    const dispatch = useDispatch();
    const history = useNavigate()
    const [username, setUsername] = useState(null)

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(logout());
      };
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                KickOff
        </Link>
            {userInfo
                ? <div>
                    <Button onClick = {handleSubmit}>Logout</Button>
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
