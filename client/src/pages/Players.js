
import "../styles/Team.css";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
/*
class Players extends React.Component {

    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }


    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
            "http://localhost:5001/api/players")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }

    render() {
        const { DataisLoaded, items } = this.state;
    
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div>;

        return (
            <div className="teamsList">
                <h1 className="headline">  </h1>  {
                    items.map((item) => (

                        <ol className="team" key={item.id} >
                            <p><img
                                src={item.p_image}
                                alt="account upload"
                                width={150}
                                height={150}
                                className="account-box-img-img"
                            /></p>
                            <h1 className="stadium">{item.p_num} - {item.p_name}</h1>
                            <p className="teamName">{item.teamname}</p>
                            <p className="stadium">Position: {item.p_pos}</p>
                        </ol>
                    ))
                }
            </div>
        );
    }
}

export default Players;

*/

export default function Players() {
    const [input, setInput] = useState("");
    const [playerList, setPlayerList] = useState([]);
    const getPlayer = () => {
        Axios.get("/api/players").then((response) => {
            setPlayerList(response.data);
        });
    };
    const [open, setOpen] = React.useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [id, setId] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInput(e.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

      /**
       * This function handle deleting player.
       * Sets Id as an Id of a player that will be deleted.
       * @param {string} _id id of a player
       */    
    function handleOpen(_id) {
        handleClickOpen();
        setId(_id);
    }

      /**
       * This function handles clicking "Delete Player" button
       * Deletes player with id then gets player from database again.
       */   
    async function triggerDelete() {
        try {
            const API = "/api/player/" + id;
            const { data } = await Axios.delete(API);

            getPlayer();
            handleClose();
            dispatch({ type: "PLAYER_DELETE_SUCCESS", payload: data });

        } catch (error) {
            dispatch({
                type: "PLAYER_DELETE_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    }

    return (
        <div>
            <div className="search">
                <p></p>
                <div className="toget">
                    <form >
                        Enter team name
                        &nbsp;
                    <input id="teamName_field"type="text" onChange={handleChange}></input>
                    </form>
                &nbsp; &nbsp;
                <button className="search1" id="myButton22" onClick={getPlayer}>Show Players</button>
                </div>
                <p></p>
            </div>
            <div className="teamsList">


                {playerList.map((val, key) => {
                    if (val.teamname === input) {
                        return (
                            <ol className="team" key={val.id} >
                                <p><img
                                    src={val.p_image}
                                    alt="account upload"
                                    width={150}
                                    height={150}
                                    className="account-box-img-img"
                                /></p>
                                <h1 className="stadium">{val.p_num} - {val.p_name}</h1>
                                <p className="teamName">{val.teamname}</p>
                                <p className="stadium">Position: {val.p_pos}</p>
                                <div>
                                {userInfo.isAdmin && (
                                    <div>
                                        <button onClick={() => handleOpen(val._id)}>Delete Player</button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Delete player?"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Are you sure you want to delete the player?
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
                                )}
                                </div>
                                
                            </ol>
                        );
                    }
                })}
            </div>
        </div>
    );
}
