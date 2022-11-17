import { useState } from 'react';
import Axios from 'axios';
import '../styles/update.css'

export default function Update() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userList, setUserList] = useState([]);
    const [newPassword, setNewPassword] = useState("");
  

    let na = true;
    const getUsers = () => {
      Axios.get("api/users").then((response) => {
        setUserList(response.data);
      });
    };

    const deleteUser = (_id) => {
      const api_str = "api/user/"
      const api_str2 = api_str + _id;
      Axios.delete(api_str2);
    };
  
    const updateUser = (_id) => {
      const api_str = "api/updateUser/"
      const api_str2 = api_str + _id;
      Axios.post(api_str2, {
        username: username,
        password: newPassword,
      });
      setNewPassword("")
    };
  
    return (
  
      <div className="App">          
        <div className="users">
          <button onClick={getUsers} className="staticButton">Show Users</button>

          {userList.map((val, key) => {
            return (
              <div className='user'> 
                <h2>{val.username}</h2>
                <p>Email:{val.email}</p>
                <p>Password:{val.password}</p>
  
                <input type="text" placeholder="Enter Your New Password" id="updateInput" onChange={(event) => {
                  setNewPassword(event.target.value)
                }}/>
                <input type="text" placeholder="Enter New Email" id="updateInput" onChange={(event) => {
                  setNewPassword(event.target.value)
                }}/>
                <p> {" "}</p>
                <button className='Button'  onClick={(updateUsers) => {updateUsers(val._id)}}>Update</button>
                <button className='Button'  onClick={(deleteUser) => {deleteUser(val._id)}}>Delete</button>
                
              </div>
            );
          })}
        </div>
      </div>
  
    );
}