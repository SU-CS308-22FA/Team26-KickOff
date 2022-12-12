import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import '../styles/update.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Update() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userList, setUserList] = useState([]);
    const [newPassword, setNewPassword] = useState("");
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let na = true;
    const getUsers = () => {
      Axios.get("api/users").then((response) => {
        setUserList(response.data);
      });
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    function handleOpen (_id) {
      handleClickOpen();
      setId(_id);
    }

    async function triggerDelete () {
      try {
        dispatch({ type: USER_DELETE_REQUEST });

        handleClose();
        if (id === "637c13b3795d46a526d7bb46"){
          
        }
        else {
          const API = "/api/user/" + id;
          const { data } = await Axios.delete(API);
      
          dispatch({ type: USER_DELETE_SUCCESS, payload: data });
        }
      } catch (error) {
        dispatch({
          type: USER_DELETE_FAIL,
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
          <button onClick={getUsers} className="staticButton">Show Users</button>

          {userList.map((val, key) => {
            return (
              <div className='user'> 
                <h2>{val.username}</h2>
                <p>{val.email}</p>

                <p> {" "}</p>
                <button className='Button'  onClick={() => handleOpen(val._id)}>Delete Account</button>
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