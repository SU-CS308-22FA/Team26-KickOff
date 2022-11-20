import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MainScreen from "../components/MainScreen";
import "../styles/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, deleteUser } from "../actions/userActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material"

const Profile = () => {
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState("");

	const [open, setOpen] = React.useState(false);
	const [openPicture, setOpenPicture] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, error, success } = userUpdate;

	const userDelete = useSelector((state) => state.userDelete);
	const { loadingUserDelete, errorUserDelete, successUserDelete } = userDelete;

	useEffect(() => {
		if (!userInfo) {
			navigate("/");
		} else {
			setUserName(userInfo.username);
			setEmail(userInfo.email);
		}
	}, [navigate, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateProfile({ username, email, password }));
	};
	const submitPicture = (e) => {
		e.preventDefault();
		dispatch(updateProfile({image}));
		handleClosePicture();
	}

	const deleteUserHandler = () => {
		dispatch(deleteUser());
	};


	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpenPicture = () => {
		setOpenPicture(true);
	};
	const handleClosePicture = () => {
		setOpenPicture(false);
	};

	return (
		<MainScreen title="EDIT INFORMATIONS">
			<div>
				<Row className="profileContainer">
					<Col md={12}>
						<Form onSubmit={submitHandler}>
							{loading && <Loading />}
							{success && (
								<ErrorMessage variant="success">
									Updated Successfully
								</ErrorMessage>
							)}
							{error && (
								<ErrorMessage variant="danger">
									{error}
								</ErrorMessage>
							)}
							{loadingUserDelete && <Loading />}
							{successUserDelete && (
								<ErrorMessage variant="success">
									Updated Successfully
								</ErrorMessage>
							)}
							{errorUserDelete && (
								<ErrorMessage variant="danger">
									{errorUserDelete}
								</ErrorMessage>
							)}
							<img
								src={userInfo.image ? userInfo.image: "https://cdn-icons-png.flaticon.com/512/18/18601.png"}
								alt="account upload"
								width={150}
								height={150}
								className="account-box-img-img"
							/>
							<p> </p>
							<Button sx={{ mt: 2, mb: 2 }} variant="contained" onClick={handleClickOpenPicture}>
								Change Profile Picture
								</Button>
							<Dialog
								open={openPicture}
								onClose={handleClosePicture}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">
									{"Profile Picture"}
								</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										Please enter URL for profile picture
									</DialogContentText>
									<TextField
										margin="normal"
										required
										fullWidth
										placeholder='Enter URL'
										id="fileUrl"
										label="File URL"
										name="fileUrl"
										value={image}
										onChange={(e) => setImage(e.target.value)}
										autoFocus
									/>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClosePicture}>No</Button>
									<Button onClick={submitPicture} autoFocus>
										Yes
									</Button>
								</DialogActions>
							</Dialog>
							<TextField
								margin="normal"
								required
								fullWidth
								placeholder='Enter Username'
								id="username"
								label="Username"
								name="username"
								value={username}
								onChange={(e) => setUserName(e.target.value)}
								autoFocus
							/>
							<p> </p>
							<TextField
								margin="normal"
								required
								fullWidth
								name="email"
								label="Email"
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="current-password"
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
							<p> </p>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Confirm Password"
								type="password"
								id="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								autoComplete="current-password"
							/>

							<Row>
								<Col md={12}>
									<Button sx={{ mt: 2, mb: 2, mr: 2 }} variant="contained" color="primary" type="submit" varient="primary">
										Update
								</Button>
									<Button sx={{ mt: 2, mb: 2 }} variant="contained" color="error" onClick={handleClickOpen}>
										Delete Account
								</Button>
									<Dialog
										open={open}
										onClose={handleClose}
										aria-labelledby="alert-dialog-title"
										aria-describedby="alert-dialog-description"
									>
										<DialogTitle id="alert-dialog-title">
											{"Delete account?"}
										</DialogTitle>
										<DialogContent>
											<DialogContentText id="alert-dialog-description">
												Are you sure you want to delete the account?
									</DialogContentText>
										</DialogContent>
										<DialogActions>
											<Button onClick={handleClose}>No</Button>
											<Button onClick={deleteUserHandler} autoFocus>
												Yes
									</Button>
										</DialogActions>
									</Dialog>
								</Col>
							</Row>

						</Form>

					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default Profile;