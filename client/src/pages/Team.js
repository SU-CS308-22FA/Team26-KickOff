import { Link } from "react-router-dom"
import "../styles/Team.css";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import Axios from 'axios';

class Team extends React.Component {

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
            "http://localhost:5001/api/teams")
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
                 {
                    items.map((item) => (
                        <ol className="team" key={item.id} >
                            <p><img
                                src={item.logo}
                                alt="account upload"
                                width={150}
                                height={150}
                                className="account-box-img-img"
                            /></p>
                            <h1 className="teamName">{item.teamname}</h1>
                            <p className="director">Technical Director: {item.director}</p>
                            <p className="stadium">Stadium Name: {item.st_name}</p>
                            <p><Button variant="outlined" href='/players' color="inherit">
                                Players
                            </Button></p>
                        </ol>
                    ))
                }
            </div>
        );
    }
}

export default Team;
/*

const retTeam ="";

export default function Team() {
    const [teamList, setTeamList] = useState([]);
    const getTeam = () => {
        Axios.get("http://localhost:5001/api/teams").then((response) => {
            setTeamList(response.data);
        });
    };

    const handleChange = (e) => {
        retTeam = e.target.value.teamname;
      };

    const retTeam ="";

    return (
        <div className="App">
            <div className="users">
                <button onClick={getTeam}>Show All Teams</button>

                {teamList.map((val, key) => {
                    return (
                        <div className="teamsList">
                            {

                                <ol className="team" key={val.id} >
                                    <p><img
                                        src={val.logo}
                                        alt="account upload"
                                        width={150}
                                        height={150}
                                        className="account-box-img-img"
                                    /></p>
                                    <h1 className="teamName">{val.teamname}</h1>
                                    <p className="director">Technical Director: {val.director}</p>
                                    <p className="stadium">Stadium Name: {val.st_name}</p>
                                    <p><Button variant="outlined" href='/players' color="inherit">
                                        Players
                                    </Button></p>
                                </ol>

                            }
                        </div>
                    );
                })}
            </div>
        </div>

    );
}
*/
