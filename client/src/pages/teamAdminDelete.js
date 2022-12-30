import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../styles/update.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TeamDelete() {

    const [teamname, setTeamName] = useState("");
    const [teamList, setteamList] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTeams = () => {
        Axios.get("api/teams").then((response) => {
            setteamList(response.data);
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function handleOpen(_id) {
        handleClickOpen();
        setId(_id);
    }

    async function triggerDelete() {
        try {
            dispatch({ type: "TEAM_DELETE_REQUEST" });

            handleClose();

            const API = "/api/team/" + id;
            const { data } = await Axios.delete(API);
            getTeams();
            dispatch({ type: "TEAM_DELETE_SUCCESS", payload: data });

        } catch (error) {
            dispatch({
                type: "TEAM_DELETE_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }

    }

    return (

        <div className="App">
            <div className="users">
                <button onClick={getTeams} className="staticButton">Show Teams</button>

                {teamList.map((val, key) => {
                    return (
                        <div className='user'>
                            <h2>{val.teamname}</h2>
                            <p>{val.director}</p>

                            <p> {" "}</p>
                            <button className='Button' onClick={() => handleOpen(val._id)}>Delete Team</button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Delete Team?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to delete the team?
									</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button onClick={() => triggerDelete()} autoFocus>
                                        Yes
									</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    );
                })}
            </div>
        </div>

    );
}