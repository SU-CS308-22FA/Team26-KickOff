import { useState, useEffect } from 'react';
import { Avatar, Grid, Paper, TextField, Typography, Button, Link, Box, Container } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline";
import { login } from "../actions/userActions";
import axios from 'axios';
import '../styles/login.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"
import Loading from "../components/Loading";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function Login() {

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

useEffect(() => {
  if (userInfo != null) 
  {
    navigate("/profile");
  }
}, []);

const handleSubmit = (event) => {
  event.preventDefault();
  dispatch(login(username, password));
};

    const paperStyle = { padding: 20, height: "380px", width: 350, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
    const avatarStyle = { backgroundColor: "#03396c", width: "50px", height: "50px", margin: "0px" }
    const buttonStyle = { margin: "10px 10", width: "49%" }
    return (
      <ThemeProvider theme={theme}>
			<Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align= "center">
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Login</h2>
          </Grid>
			<TextField
							margin="normal"
							required
							fullWidth
							placeholder='Enter Username'
							id="username"
							label="Username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							autoFocus
						/>
            <p> </p>
			<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="current-password"
						/>
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
              <Button type="submit" color="primary" variant='contained' onClick = { handleSubmit } style = {buttonStyle} halfWidth>
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
		</ThemeProvider>
	/*


	*/
	);
  }

  export default Login;