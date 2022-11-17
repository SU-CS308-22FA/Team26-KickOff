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


export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userList, setUserList] = useState([]);
  const [newPassword, setNewPassword] = useState("");


  const history = useNavigate();
  async function handleRegister(e) {
    e.preventDefault()
    const form = e.target
    const user = {
      username: form[0].value,
      email: form[1].value,
      password: form[2].value,
    }
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
  }

  useEffect(() => {
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => data.isLoggedIn ? history("/update") : null)
  }, [])
/*
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,//spread operator 
      [name]: value
    })
  }

  const addUser = () => {
    const { username, email, password } = user;
    if (username && email && password) {
      Axios.post("/api/user", user).then(res => console.log(res))
    }
    else {
      alert("invalid input")
    };
  };*/


  const paperStyle2 = { padding: 20, height: "300px", width: 350, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
  const avatarStyle = { backgroundColor: "#03396c", width: "30px", height: "30px" }
  const buttonStyle = { margin: "8px 0" }
  return (
    <Grid>
      <Paper elevation={5} style={paperStyle2}>
        <Grid align="center ">
          <h2>Sign Up</h2>
        </Grid>

        <form onSubmit={event => handleRegister(event)}>
          <input required type="username" id="sign-in-email" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="username" placeholder="Your username" />
          <p> </p>
          <input required type="email" id="sign-in-email" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="email" placeholder="Your email" />
          <p> </p>
          <input required type="password" id="sign-in-email" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" placeholder="Your password" />
          <input type="submit" value="Register" />
        </form>


        <p> {" "} </p>
        <button className="Button3" type="submit" color="rgb(0,0,0)" variant='contained' halfWidth> Register </button>
      </Paper>
    </Grid>
  );
}