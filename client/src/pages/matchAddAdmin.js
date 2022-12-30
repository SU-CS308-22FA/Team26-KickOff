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
import { addMatch } from "../actions/matchActions";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { TextField } from "@mui/material"
import ErrorMessage from "../components/ErrorMessage";

import '../styles/update.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MatchAddAdmin() {
    const [open, setOpen] = React.useState(false);
    const [teamName, setTeamName] = useState("");
    const [number, setNumber] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [playerPosition, setPlayerPosition] = useState("");
    const [playerImage, setPlayerImage] = useState("");
    const [playerImageChecker, setPlayerImageChecker] = useState("");
    const [fillBlank, setfillBlank] = useState(false);
    const [success, setsuccess] = useState(false);

    const [openPicture, setOpenPicture] = useState(false);

    const [stadiumname, setStadium] = useState("");
    const [refereename, setReferee] = useState("");
    const [date, setdate] = useState("");

    const [hometeam, setHomeTeamName] = useState("");
    const [firsthalfscoreHome, setHomeFirstHalfScore] = useState("");
    const [secondhalfscoreHome, setHomeSecondHalfScore] = useState("");
    const [ballpossesionHome, setHomeBallPosession] = useState("");
    const [totalshotsHome, setHomeTotalShots] = useState("");
    const [shotsonbarHome, setHomeShotsOnBar] = useState("");
    const [shotsontargetHome, setHomeShotsOnTarget] = useState("");
    const [cornerkicksHome, setHomeCorner] = useState("");
    const [foulsHome, setHomeFouls] = useState("");
    const [offsidesHome, setHomeOffSide] = useState("");
    const [yellowcardsHome, setHomeYellowCard] = useState("");
    const [redcardsHome, setHomeRedCard] = useState("");
    const [goalsavesHome, setHomeGoalSaves] = useState("");
    const [passesHome, setHomePasses] = useState("");
    const [accpassesHome, setHomeAccPasses] = useState("");

    const [awayteam, setawayteam] = useState("");
    const [firsthalfscoreAway, setfirsthalfscoreAway] = useState("");
    const [secondhalfscoreAway, setsecondhalfscoreAway] = useState("");
    const [ballpossesionAway, setballpossesionAway] = useState("");
    const [totalshotsAway, settotalshotsAway] = useState("");
    const [shotsonbarAway, setshotsonbarAway] = useState("");
    const [shotsontargetAway, setshotsontargetAway] = useState("");
    const [cornerkicksAway, setcornerkicksAway] = useState("");
    const [foulsAway, setfoulsAway] = useState("");
    const [offsidesAway, setoffsidesAway] = useState("");
    const [yellowcardsAway, setyellowcardsAway] = useState("");
    const [redcardsAway, setredcardsAway] = useState("");
    const [goalsavesAway, setgoalsavesAway] = useState("");
    const [passesAway, setpassesAway] = useState("");
    const [accpassesAway, setaccpassesAway] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();



    const submitHandler = (e) => {
        e.preventDefault();
        if ( stadiumname && refereename && date && hometeam && firsthalfscoreHome && secondhalfscoreHome && ballpossesionHome && totalshotsHome && shotsonbarHome && shotsontargetHome && cornerkicksHome  && foulsHome && offsidesHome && yellowcardsHome && redcardsHome && goalsavesHome  && passesHome && accpassesHome && awayteam && firsthalfscoreAway && secondhalfscoreAway && ballpossesionAway && totalshotsAway && shotsonbarAway && shotsontargetAway && cornerkicksAway && foulsAway && offsidesAway && yellowcardsAway && redcardsAway && goalsavesAway && passesAway && accpassesAway) {
            setfillBlank(false);
            dispatch(addMatch({ "stadiumname":stadiumname , "refereename":refereename , "date":date , "hometeam":hometeam , "firsthalfscoreHome":firsthalfscoreHome , "secondhalfscoreHome":secondhalfscoreHome , "ballpossesionHome":ballpossesionHome , "totalshotsHome":totalshotsHome , "shotsonbarHome":shotsonbarHome , "shotsontargetHome":shotsontargetHome , "cornerkicksHome":cornerkicksHome ,  "foulsHome":foulsHome , "offsidesHome":offsidesHome , "yellowcardsHome":yellowcardsHome , "redcardsHome":redcardsHome , "goalsavesHome":goalsavesHome  , "passesHome":passesHome , "accpassesHome":accpassesHome , "awayteam":awayteam , "firsthalfscoreAway":firsthalfscoreAway , "secondhalfscoreAway":secondhalfscoreAway , "ballpossesionAway":ballpossesionAway , "totalshotsAway":totalshotsAway , "shotsonbarAway":shotsonbarAway , "shotsontargetAway":shotsontargetAway , "cornerkicksAway":cornerkicksAway , "foulsAway":foulsAway , "offsidesAway":offsidesAway , "yellowcardsAway":yellowcardsAway , "redcardsAway":redcardsAway , "goalsavesAway":goalsavesAway , "passesAway":passesAway , "accpassesAway":accpassesAway }));
            setsuccess(true);
        }
        else {
            setfillBlank(true);
        }
    };
    const setAllNull = (e) => {

    }

    const handleHomeTeam = (Team) => {
        setHomeTeamName(Team);
    }
    const handleAwayTeam = (Team) => {
        setawayteam(Team);
    }


    return (
        <>
            <h1 align="center">Add Match</h1>
            <div>
                <Row>


                    {fillBlank ?
                        <ErrorMessage variant="danger">
                            Please fill all blanks
								</ErrorMessage> : null}
                    <p> </p>

                    {success && (
                        <ErrorMessage variant="success">
                            Match Added Successfully
                        </ErrorMessage>
                    )}
                    <p> </p>
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Stadium Name'
                            id="stadiumname"
                            label="Stadium Name"
                            name="stadiumname"
                            value={stadiumname}
                            onChange={(e) => setStadium(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Referee Name'
                            id="refereename"
                            label="Referee Name"
                            name="refereename"
                            value={refereename}
                            onChange={(e) => setReferee(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Date'
                            id="date"
                            label="Date"
                            name="date"
                            value={date}
                            onChange={(e) => setdate(e.target.value)}
                            autoFocus
                        />
                        <p> </p>

                    <Col md={5}>
                        <h3 align="center">Home Team Informations</h3>
                        <div className="d-flex" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <DropdownButton
                                alignRight
                                title={hometeam ? hometeam : "Select home team"}
                                id="hometeam"
                                onSelect={handleHomeTeam}>
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
                            placeholder='Home First-half Score'
                            id="firsthalfscoreHome"
                            label="Home First-Half Score"
                            name="firsthalfscoreHome"
                            value={firsthalfscoreHome}
                            onChange={(e) => setHomeFirstHalfScore(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Second-half Score'
                            id="secondhalfscoreHome"
                            label="Home Second-half Score"
                            name="secondhalfscoreHome"
                            value={secondhalfscoreHome}
                            onChange={(e) => setHomeSecondHalfScore(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Ball Possesion'
                            id="ballpossesionHome"
                            label="Home Ball Possesion"
                            name="ballpossesionHome"
                            value={ballpossesionHome}
                            onChange={(e) => setHomeBallPosession(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Total Shots'
                            id="totalshotsHome"
                            label="Home Total Shots"
                            name="totalshotsHome"
                            value={totalshotsHome}
                            onChange={(e) => setHomeTotalShots(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Shots on Bar'
                            id="shotsonbarHome"
                            label="Home Shots on Bar"
                            name="shotsonbarHome"
                            value={shotsonbarHome}
                            onChange={(e) => setHomeShotsOnBar(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Shots on Target'
                            id="shotsontargetHome"
                            label="Home Shots on Target"
                            name="shotsontargetHome"
                            value={shotsontargetHome}
                            onChange={(e) => setHomeShotsOnTarget(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Corner Kicks'
                            id="cornerkicksHome"
                            label="Home Corner Kicks"
                            name="cornerkicksHome"
                            value={cornerkicksHome}
                            onChange={(e) => setHomeCorner(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Fouls'
                            id="foulsHome"
                            label="Home Fouls"
                            name="foulsHome"
                            value={foulsHome}
                            onChange={(e) => setHomeFouls(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Offsides'
                            id="offsidesHome"
                            label="Home Offsides"
                            name="offsidesHome"
                            value={offsidesHome}
                            onChange={(e) => setHomeOffSide(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Yellow Cards'
                            id="yellowcardsHome"
                            label="Home Yellow Cards"
                            name="yellowcardsHome"
                            value={yellowcardsHome}
                            onChange={(e) => setHomeYellowCard(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Red Cards'
                            id="redcardsHome"
                            label="Home Red Cards"
                            name="redcardsHome"
                            value={redcardsHome}
                            onChange={(e) => setHomeRedCard(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Goal Saves'
                            id="goalsavesHome"
                            label="Home Goal Saves"
                            name="goalsavesHome"
                            value={goalsavesHome}
                            onChange={(e) => setHomeGoalSaves(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Passes'
                            id="passesHome"
                            label="Home Passes"
                            name="passesHome"
                            value={passesHome}
                            onChange={(e) => setHomePasses(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Home Accurate Passes'
                            id="accpassesHome"
                            label="Home Accurate Passes"
                            name="accpassesHome"
                            value={accpassesHome}
                            onChange={(e) => setHomeAccPasses(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                    </Col>


                    <Col md={2}></Col>


                    <Col md={5}>
                        <h3 align="center">Home Team Informations</h3>
                        <div className="d-flex" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <DropdownButton
                                alignRight
                                title={awayteam ? awayteam : "Select home team"}
                                id="awayteam"
                                onSelect={handleAwayTeam}>
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
                            placeholder='Away First-half Score'
                            id="firsthalfscoreAway"
                            label="Away First-Half Score"
                            name="firsthalfscoreAway"
                            value={firsthalfscoreAway}
                            onChange={(e) => setfirsthalfscoreAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Second-half Score'
                            id="secondhalfscoreAway"
                            label="Away Second-half Score"
                            name="secondhalfscoreAway"
                            value={secondhalfscoreAway}
                            onChange={(e) => setsecondhalfscoreAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Ball Possesion'
                            id="ballpossesionAway"
                            label="Away Ball Possesion"
                            name="ballpossesionAway"
                            value={ballpossesionAway}
                            onChange={(e) => setballpossesionAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Total Shots'
                            id="totalshotsAway"
                            label="Away Total Shots"
                            name="totalshotsAway"
                            value={totalshotsAway}
                            onChange={(e) => settotalshotsAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Shots on Bar'
                            id="shotsonbarAway"
                            label="Away Shots on Bar"
                            name="shotsonbarAway"
                            value={shotsonbarAway}
                            onChange={(e) => setshotsonbarAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Shots on Target'
                            id="shotsontargetAway"
                            label="Away Shots on Target"
                            name="shotsontargetAway"
                            value={shotsontargetAway}
                            onChange={(e) => setshotsontargetAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Corner Kicks'
                            id="cornerkicksAway"
                            label="Away Corner Kicks"
                            name="cornerkicksAway"
                            value={cornerkicksAway}
                            onChange={(e) => setcornerkicksAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Fouls'
                            id="foulsAway"
                            label="Away Fouls"
                            name="foulsAway"
                            value={foulsAway}
                            onChange={(e) => setfoulsAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Offsides'
                            id="offsidesAway"
                            label="Away Offsides"
                            name="offsidesAway"
                            value={offsidesAway}
                            onChange={(e) => setoffsidesAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Yellow Cards'
                            id="yellowcardsAway"
                            label="Away Yellow Cards"
                            name="yellowcardsAway"
                            value={yellowcardsAway}
                            onChange={(e) => setyellowcardsAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Red Cards'
                            id="redcardsAway"
                            label="Away Red Cards"
                            name="redcardsAway"
                            value={redcardsAway}
                            onChange={(e) => setredcardsAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Goal Saves'
                            id="goalsavesAway"
                            label="Away Goal Saves"
                            name="goalsavesAway"
                            value={goalsavesAway}
                            onChange={(e) => setgoalsavesAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Passes'
                            id="passesAway"
                            label="Away Passes"
                            name="passesAway"
                            value={passesAway}
                            onChange={(e) => setpassesAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='Away Accurate Passes'
                            id="accpassesAway"
                            label="Away Accurate Passes"
                            name="accpassesAway"
                            value={accpassesAway}
                            onChange={(e) => setaccpassesAway(e.target.value)}
                            autoFocus
                        />
                        <p> </p>
                    </Col>


                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <Button id="myButton" sx={{ mt: 2, mb: 2, mr: 2 }} variant="contained" color="primary" type="submit" varient="primary" onClick={submitHandler}>
                                Add Match
							</Button>

                        </Col>
                        <Col md={3}></Col>
                    </Row>





                </Row>

            </div>
        </>
    );
}