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
import { addUpcomingMatch } from "../actions/upcomingmatchActions";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { TextField } from "@mui/material"
import ErrorMessage from "../components/ErrorMessage";

import '../styles/update.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UpcomingMatchAddAdmin() {
    const [open, setOpen] = React.useState(false);

    const [hometeamU, sethometeamU] = useState("");
    const [awayteamU, setawayteamU] = useState("");
    const [refereenameU, setrefereenameU] = useState("");
    const [dateU, setdateU] = useState("");
    const [stadiumnameU, setStadiumNameU] = useState("");

    const [fillBlank, setfillBlank] = useState(false);
    const [success, setsuccess] = useState(false);



    const dispatch = useDispatch();
    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        if (hometeamU && awayteamU && refereenameU && dateU && stadiumnameU) {
            setfillBlank(false);
            dispatch(addUpcomingMatch({ hometeamU, awayteamU , refereenameU , dateU , stadiumnameU }));
            setsuccess(true);
            sethometeamU("");
            setawayteamU("");
            setrefereenameU("");
            setdateU("");
            setStadiumNameU("");
        }
        else {
            setfillBlank(true);
        }
    };



    return (
        <>
            <h1 align="center">Add Upcoming Match</h1>
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

                            {success && (
                                <ErrorMessage variant="success">
                                    Upcoming Match Added Successfully
                                </ErrorMessage>
                            )}
                            <p> </p>


                            

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Home Team Name'
                                id="hometeamU"
                                label="Home Team Name"
                                name="hometeamU"
                                value={hometeamU}
                                onChange={(e) => sethometeamU(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Away Team Name'
                                id="awayteamU"
                                label="Away Team Name"
                                name="awayteamU"
                                value={awayteamU}
                                onChange={(e) => setawayteamU(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Stadium Name'
                                id="stadiumnameU"
                                label="Enter Stadium Name"
                                name="stadiumnameU"
                                value={stadiumnameU}
                                onChange={(e) => setStadiumNameU(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Referee Name'
                                id="refereenameU"
                                label="Referee Name"
                                name="refereenameU"
                                value={refereenameU}
                                onChange={(e) => setrefereenameU(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter Date'
                                id="dateU"
                                label="Date"
                                name="dateU"
                                value={dateU}
                                onChange={(e) => setdateU(e.target.value)}
                                autoFocus
                            />
                            <p> </p>


                            <Row>
                                <Col md={3}></Col>
                                <Col md={6}>
                                    <Button id="myButton" sx={{ mt: 2, mb: 2, mr: 2 }} variant="contained" color="primary" type="submit" varient="primary">
                                        Add Upcoming Match
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