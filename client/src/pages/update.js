import { useState } from 'react';
import Axios from 'axios';
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
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let na = true;
    const getUsers = () => {
      Axios.get("api/users").then((response) => {
        setUserList(response.data);
      });
    };


    async function triggerDelete (_id) {
      try {
        dispatch({ type: USER_DELETE_REQUEST });
        /*
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };*/
        
        const API = "/api/user/" + _id;
        const { data } = await Axios.delete(API);
    
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    
    
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
                <button className='Button'  onClick={() => triggerDelete(val._id)}>Delete</button>
                
              </div>
            );
          })}
        </div>
      </div>
  
    );
}