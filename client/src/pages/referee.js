import { Link } from "react-router-dom"
import "../styles/Referee.css";
import React, { useState } from "react";
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/*

<div className="search">
                <p></p>
                <div className="toget">
                    <form >
                        Enter Class
                        &nbsp;
                        <input type="text" onChange={handleChange}></input>
                    </form>
                    &nbsp; &nbsp;
                    <button className="search" onClick={getReferee}>Show Referees</button>
                </div>
                <p></p>
            </div>

class Referee extends React.Component {

    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    mapList(list) {
        this.str = ""
        list.map((item) => (
            this.str = this.str + item,
            this.str = this.str + "\r\n"
        ))
        return this.str
    }

    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
            "http://localhost:5001/refereecontroller/referees")
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
            <div>
                <div class="dropdown">
                <p></p>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>

                <div className="teamsList">
                    {
                        items.map((item) => (
                            <ol className="referee" key={val.id} >
                                <Card sx={{ maxWidth: 500 }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        src={val.r_image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {val.rname}
                                        </Typography>
                                        <Typography variant="h8" color="text.secondary">
                                            {val.class} - ({val.region})
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Matches:
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <div>
                                                {
                                                    val.matches.map((match) => (
                                                        <p>{match}</p>
                                                    ))
                                                }
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </Card>


                            </ol>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Referee;

*/

export default function Referees() {
    const [input, setInput] = useState("");
    const [select, setSelect] = useState("");
    const [refereeList, setRefereeList] = useState([]);
    const getReferee = () => {
        Axios.get("http://localhost:5001/refereecontroller/referees").then((response) => {
            setRefereeList(response.data);
        });
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSelect = (e) => {
        setSelect(e.target.value);
    }

    return (
        <div>
            <div className="search">
                <p></p>
                <div className="toget">
                    <select className="dropdown" id="select1" onChange={handleSelect}>
                        <optgroup label="Select Referee Class">
                        <option value="Super League Referee">Super League Referee</option>
                        <option value="Super League Assisting Referee">Super League Assisting Referee</option>
                        </optgroup>
                    </select>
                    &nbsp; &nbsp;
                    <button className="button-7" onClick={getReferee}>Show Referees</button>
                </div>
                <p></p>
            </div>

            <div className="teamsList">


                {refereeList.map((val, key) => {
                    if (val.class == select) {
                        return (
                            <ol className="referee" key={val.id} >
                                <Card sx={{ maxWidth: 500 }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        src={val.r_image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {val.rname}
                                        </Typography>
                                        <Typography variant="h8" color="text.secondary">
                                            {val.class} - ({val.region})
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Matches:
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <div>
                                                {
                                                    val.matches.map((match) => (
                                                        <p>{match}</p>
                                                    ))
                                                }
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </Card>


                            </ol>

                        );
                    }
                })}
            </div>
        </div>
    );
}