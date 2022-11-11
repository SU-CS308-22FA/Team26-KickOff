import {useState} from 'react';
import {Avatar, Grid, Paper, TextField, Typography, Button, Link} from "@mui/material"
import Axios from 'axios';
import '../styles/login.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userList, setUserList] = useState([]);
  const [newPassword, setNewPassword] = useState("");

  const addUser = () => {
    Axios.post("http://localhost:3001/signup", {
      username: username, 
      password: password,
      email: email,
    }).then(() => {
      setUserList([
        ...userList, 
        {
          username: username, 
          password: password,
          email: email,
        }
      ]);
    });
  };



  const Login=() => {
    const paperStyle={padding : 20, height: "380px", width: 350, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}
    const avatarStyle={backgroundColor: "#03396c", width: "50px", height:"50px", margin: "0px"}
    const buttonStyle={margin: "10px 10", width: "49%"}
    return(
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align= "center">
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Login</h2>
          </Grid>
            <TextField label="Username" placeholder='Enter Username' fullWidth required/>
            <p> </p>
            <TextField label="Password" placeholder='Enter Password' type="password" fullWidth required/>
          <FormControlLabel
            control={
              <Checkbox 
                  name="CheckB" 
                  color="primary"
              />
            }
            label="Remember me"
          />

          <Grid>
            <Link href="/" color="rgb(255,255,255)">
              <Button type="submit" color="primary" variant='contained' style = {buttonStyle} halfWidth>
                Login
              </Button>
            </Link>
            <span> {"    "} </span>
            <Link href="/signup" color="rgb(255,255,255)" >
              <Button type="submit" color="primary" variant='contained' style = {buttonStyle} halfWidth>
                Sign Up
              </Button>
            </Link>
          </Grid>
          <Typography>
            <Link href = "#">
              Forgot password
            </Link>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  return (
    <div className='Login'>
      <Login/>      
    </div>
   
  );
}