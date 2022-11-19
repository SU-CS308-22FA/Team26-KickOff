import { useEffect, useState } from 'react';
import { Avatar, Grid, Paper, TextField, Typography, Button, Link } from "@mui/material"
import Axios from 'axios';
import '../styles/signup.css'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import MailIcon from '@mui/icons-material/Mail';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userList, setUserList] = useState([]);
  const [newPassword, setNewPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;


  const history = useNavigate();
  async function handleRegister(e) {
    e.preventDefault()
    const form = e.target
    const user = {
      username: username,
      email: email,
      password: password,
    }
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    history("/")
  }

  useEffect(() => {
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(userInfo ? history("/profile") : null)
  }, [])



  const paperStyle2 = { padding: 20, height: "300px", width: 350, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
  const avatarStyle = { backgroundColor: "#03396c", width: "30px", height: "30px" }
  const buttonStyle = { margin: "8px 0" }
  return (
    <Grid>
      <Paper elevation={5} style={paperStyle2}>
        <Grid align="center ">
          <h2>Sign Up</h2>
        </Grid>
        <div className='information'>
          <input required
            border= "1px "
            type="text"
            placeholder= "*Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }} />
          <input required
            type="mail"
            placeholder="*E-mail"
            onChange={(event) => {
              setEmail(event.target.value);
            }} />
          <input required
            type="password"
            placeholder="*Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }} />
        </div>

        

        <p> {" "} </p>
        <button onClick={handleRegister} className="Button3" type="submit" color="rgb(0,0,0)" variant='contained' halfWidth> Register </button>
      </Paper>
    </Grid>
    
  );
}