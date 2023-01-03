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
import { addPlayer } from "../actions/playerActions";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { TextField } from "@mui/material"
import ErrorMessage from "../components/ErrorMessage";

import '../styles/update.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PlayerAddAdmin() {
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [teamName, setTeamName] = useState("");
    const [number, setNumber] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [playerPosition, setPlayerPosition] = useState("");
    const [playerImage, setPlayerImage] = useState("");
    const [playerImageChecker, setPlayerImageChecker] = useState("");
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
        if (playerName && number && teamName && playerPosition && playerImage) {
            setfillBlank(false);
            dispatch(addPlayer({ "teamname": teamName, "p_num": number, "p_name": playerName, "p_pos": playerPosition, "p_image": playerImage }));
            setsuccess(true);
        }
        else {
            setfillBlank(true);
        }
    };
    const handleTeam = (Team) => {
        setTeamName(Team);
    }
    const handlePosition = (position) => {
        setPlayerPosition(position);
    }
    const submitPicture = (e) => {
        e.preventDefault();
        if (validURL(playerImageChecker)) {
            setPlayerImage(playerImageChecker);
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
            <h1 align="center">Add player</h1>
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
                                    Player Added Successfully
                                </ErrorMessage>
                            )}
                            <p> </p>
                            <div className="d-flex" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <img
                                    src={playerImage ? playerImage : "https://cdn-icons-png.flaticon.com/512/18/18601.png"}
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
                                    Add player picture
                                </Button>
                            </div>

                            <Dialog
                                open={openPicture}
                                onClose={handleClosePicture}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Player Picture"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please enter URL for player picture
                                    </DialogContentText>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        placeholder='Enter URL'
                                        id="fileUrl"
                                        label="File URL"
                                        name="fileUrl"
                                        value={playerImageChecker}
                                        onChange={(e) => setPlayerImageChecker(e.target.value)}
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
                                    title={teamName ? teamName : "Select team for player"}
                                    id="playerTeam"
                                    onSelect={handleTeam}>
                                    <Dropdown.Item eventKey="Adana Demirspor">Adana Demirspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ankaragücü">Ankaragücü</Dropdown.Item>
                                    <Dropdown.Item eventKey="Antalyaspor">Antalyaspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Alanyaspor">Alanyaspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Başakşehir">Başakşehir</Dropdown.Item>
                                    <Dropdown.Item eventKey="Beşiktaş">Beşiktaş</Dropdown.Item>
                                    <Dropdown.Item eventKey="Fatih Karagümrük">Fatih Karagümrük</Dropdown.Item>
                                    <Dropdown.Item eventKey="Fenerbahçe">Fenerbahçe</Dropdown.Item>
                                    <Dropdown.Item eventKey="Galatasaray">Galatasaray</Dropdown.Item>
                                    <Dropdown.Item eventKey="Gaziantep">Gaziantep</Dropdown.Item>
                                    <Dropdown.Item eventKey="Giresunspor">Giresunspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Hatayspor">Hatayspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="İstanbulspor">İstanbulspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Kasımpaşa">Kasımpaşa</Dropdown.Item>
                                    <Dropdown.Item eventKey="Kayserispor">Kayserispor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Konyaspor">Konyaspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Sivasspor">Sivasspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Trabzonspor">Trabzonspor</Dropdown.Item>
                                    <Dropdown.Item eventKey="Ümraniyespor">Ümraniyespor</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Player Name'
                                id="playerName"
                                label="Player Name"
                                name="playerName"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Player Number'
                                id="number"
                                label="Number"
                                name="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                autoFocus
                            />
                            <p> </p>


                            <DropdownButton
                                alignRight
                                title={playerPosition ? playerPosition : "Select position for player"}
                                id="playerPosition"
                                onSelect={handlePosition}>
                                <Dropdown.Item eventKey="Goalkeeper">Goalkeeper</Dropdown.Item>
                                <Dropdown.Item eventKey="Defense">Defense</Dropdown.Item>
                                <Dropdown.Item eventKey="Midfielder">Midfielder</Dropdown.Item>
                                <Dropdown.Item eventKey="Forward">Forward</Dropdown.Item>
                            </DropdownButton>

                            <Row>
                                <Col md={3}></Col>
                                <Col md={6}>
                                    <Button id="myButton" sx={{ mt: 2, mb: 2, mr: 2 }} variant="contained" color="primary" type="submit" varient="primary">
                                        Add Player
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