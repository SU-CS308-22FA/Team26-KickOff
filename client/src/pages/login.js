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
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				{loading && <Loading size={55}/>}
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username Address"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							autoFocus
						/>
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
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<Box
						>
							<Paper>
								<Box 
									textAlign="center"
									color="red"
								>
								{error && error}
								</Box>
							</Paper>

						</Box>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={loading}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
  }

  export default Login;