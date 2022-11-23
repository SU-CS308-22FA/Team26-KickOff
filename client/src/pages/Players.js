
import "../styles/Team.css";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import Axios from 'axios';
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
        Axios.get("http://localhost:5001/api/players").then((response) => {
            setPlayerList(response.data);
        });
    };

    const handleChange = (e) => {
        setInput(e.target.value);
      };

    return (
        <div>
            <div className="search">
                <p></p>
            <div className="toget">
            <form >
                    Enter team name 
                    &nbsp;
                    <input type="text" onChange={handleChange}></input>
                </form>
                &nbsp; &nbsp;
                <button className="search" onClick={getPlayer}>Show Players</button>
                </div>
                <p></p>
                </div>
            <div className="teamsList">


                {playerList.map((val, key) => {
                    if (val.teamname == input) {
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
                            </ol>
                        );
                    }
                })}
            </div>
        </div>
    );
}
