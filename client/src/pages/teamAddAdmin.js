import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Row, Col } from "react-bootstrap";
import Loading from "../components/Loading";
import { addTeam } from "../actions/teamActions";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { TextField } from "@mui/material"
import ErrorMessage from "../components/ErrorMessage";

import '../styles/update.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TeamAddAdmin() {
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = React.useState(false);

    const [teamName, setTeamName] = useState("");
    const [teamImage, setTeamImage] = useState("");
    const [teamImageChecker, setTeamImageChecker] = useState("");
    const [technicDirector, setTechnicDirector] = useState("");
    const [stadiumName, setStadiumName] = useState("");

    const [imageFormat, setImageFormat] = useState(false);
    const [fillBlank, setfillBlank] = useState(false);
    const [success, setsuccess] = useState(false);

    const [openPicture, setOpenPicture] = useState(false);



    const dispatch = useDispatch();
    const navigate = useNavigate();


    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (teamName && teamImage && technicDirector && stadiumName) {
            setfillBlank(false);
            dispatch(addTeam({ "teamname":teamName , "logo":teamImage , "director":technicDirector , "st_name":stadiumName }));
            setsuccess(true);
        }
        else {
            setfillBlank(true);
        }
    };

    const submitPicture = (e) => {
        e.preventDefault();
        if (validURL(teamImageChecker)) {
            setTeamImage(teamImageChecker);
            handleClosePicture();
            setImageFormat(false);
        }
        else {
            setImageFormat(true);
        }
    }

    const handleClickOpenPicture = () => {
        setOpenPicture(true);
    };
    const handleClosePicture = () => {
        setOpenPicture(false);
    };

    return (
        <>
            <h1 align="center">Add Team</h1>
            <div>
                <Row>
                    <Col md={3}>
                        <p> </p>
                    </Col>
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {fillBlank ?
                                <ErrorMessage variant="danger">
                                    Please fill all blanks
								</ErrorMessage> : null}
                            <p> </p>
                            {imageFormat ?
                                <ErrorMessage variant="danger">
                                    Please enter valid URL
								</ErrorMessage> : null}
                            {success && (
                                <ErrorMessage variant="success">
                                    Team Added Successfully
                                </ErrorMessage>
                            )}
                            <p> </p>
                            <div className="d-flex" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <img
                                    src={teamImage ? teamImage : "https://cdn-icons-png.flaticon.com/512/18/18601.png"}
                                    alt="account upload"
                                    width={150}
                                    height={150}
                                    className="account-box-img-img"
                                />

                            </div>

                            <p> </p>
                            <div className="d-flex" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Button sx={{ mt: 2, mb: 2 }} variant="contained" onClick={handleClickOpenPicture}>
                                    Add team picture
								</Button>
                            </div>

                            <Dialog
                                open={openPicture}
                                onClose={handleClosePicture}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Team Picture"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please enter URL for Team picture
									</DialogContentText>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        placeholder='Enter URL'
                                        id="fileUrl"
                                        label="File URL"
                                        name="fileUrl"
                                        value={teamImageChecker}
                                        onChange={(e) => setTeamImageChecker(e.target.value)}
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
                                placeholder='Enter Team Name'
                                id="teamName"
                                label="Team Name"
                                name="teamName"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Technic Director'
                                id="technicDirector"
                                label="Enter Technic Director"
                                name="technicDirector"
                                value={technicDirector}
                                onChange={(e) => setTechnicDirector(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Stadium Name'
                                id="stadiumName"
                                label="Enter Stadium Name"
                                name="stadiumName"
                                value={stadiumName}
                                onChange={(e) => setStadiumName(e.target.value)}
                                autoFocus
                            />
                            <p> </p>


                            <Row>
                                <Col md={3}></Col>
                                <Col md={6}>
                                    <Button id="myButton" sx={{ mt: 2, mb: 2, mr: 2 }} variant="contained" color="primary" type="submit" varient="primary">
                                        Add Team
								</Button>

                                </Col>
                                <Col md={3}></Col>
                            </Row>

                        </Form>

                    </Col>


                </Row>

            </div>
        </>
    );
}