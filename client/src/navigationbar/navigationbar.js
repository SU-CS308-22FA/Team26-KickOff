import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Button } from "@mui/material"
import { logout } from "../actions/userActions"
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
    const dispatch = useDispatch();
    const history = useNavigate()
    const [username, setUsername] = useState(null)

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(logout());
        history("/")
    };
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                KickOff
            </Link>
            {userInfo
                ?
                <ul>

                    <CustomLink to="/players">
                        Players
                    </CustomLink>
                    <CustomLink to="/teams">
                        Teams
                    </CustomLink>


                    <CustomLink to="/profile">
                        Profile
                    </CustomLink>
                    <CustomLink to="/league">
                        League
                    </CustomLink>

                    <CustomLink to="/referees">
                        Referees
                    </CustomLink>

                    <CustomLink to="/matches">
                        Matches
                    </CustomLink>

                    <CustomLink to="/team_comparison">
                        Compare Teams
                    </CustomLink>


                    <CustomLink to="/" onClick={handleSubmit}>
                        Logout
                    </CustomLink>



                    {userInfo.isAdmin ?
                        <CustomLink to="/update">
                            Delete Users
                        </CustomLink>
                        : null}



                </ul>
                : <ul>
                    <CustomLink to="/login">
                        Login
                    </CustomLink>
                    <CustomLink to="/signup">
                        Sign Up
                    </CustomLink>
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
