import React from "react";
import "../styles/Players.css";
import Button from '@mui/material/Button';
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
                <h1 className="headline"> TEAMS </h1>  {
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
                            <p><Button variant="outlined" href="#contained-buttons" color="inherit">
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