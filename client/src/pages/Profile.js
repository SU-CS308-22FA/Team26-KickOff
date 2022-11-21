import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, deleteUser } from "../actions/userActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/Profile.css";
import {
	MDBDropdown,
	MDBDropdownMenu,
	MDBDropdownToggle,
	MDBDropdownItem,
} from 'mdb-react-ui-kit';

const Profile = () => {
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState("");
	const [supportedTeam, setSupportedTeam] = useState("");
	const [imageFormat, setImageFormat] = useState(false);

	const [open, setOpen] = React.useState(false);
	const [openPicture, setOpenPicture] = useState(false);
	const [openDropDown, setOpenDropDown] = useState(false);

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
			setSupportedTeam(userInfo.supportedTeam);
		}
	}, [navigate, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateProfile({ username, email, password }));
	};
	const submitPicture = (e) => {
		e.preventDefault();
		if (validURL(image)) {
			setImageFormat(false);
			dispatch(updateProfile({ image }));
		}
		else {
			setImageFormat(true);
		}
		handleClosePicture();
	}
	const handleSupportTeam = (supportedTeam) => {
		dispatch(updateProfile({ supportedTeam }));
	}
	function settingTeam(str) {
		setSupportedTeam(str);
		handleSupportTeam();
	}

	function validURL(str) {
		var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return !!pattern.test(str);
	}

	const deleteUserHandler = () => {
		dispatch(deleteUser());
		navigate("/")
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
	const handleOpen = () => {
		setOpenDropDown(!openDropDown);
	};


	return (
		<MainScreen title="">
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
							{imageFormat ?
								<ErrorMessage variant="danger">
									Please enter valid URL
								</ErrorMessage> : null}
							<img
								src={userInfo.image ? userInfo.image : "https://cdn-icons-png.flaticon.com/512/18/18601.png"}
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

							<div className="d-flex" style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>

								<DropdownButton
									alignRight
									title={userInfo.supportedTeam ? userInfo.supportedTeam : "Select your team"}
									id="supportedTeam"
									onSelect={handleSupportTeam}>
									<Dropdown.Item eventKey="Beşiktaş">Beşiktaş</Dropdown.Item>
									<Dropdown.Item eventKey="Galatasaray">Galatasaray</Dropdown.Item>
									<Dropdown.Item eventKey="Fenerbahçe">Fenerbahçe</Dropdown.Item>
									<Dropdown.Item eventKey="Trabzonspor">Trabzonspor</Dropdown.Item>
								</DropdownButton>
							</div>
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