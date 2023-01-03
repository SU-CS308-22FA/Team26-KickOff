import { useState, useEffect } from 'react'
import Axios from 'axios';
import '../styles/detailed_team.css'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';


export default function DetailsTeam() {

    const [teamsList, setTeamList] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const [teamsInfoList, setTeamInfo] = useState([]);

    const [select, setSelect] = useState("");

    const getPlayer = () => {
        Axios.get("http://localhost:5001/api/players").then((response) => {
            setPlayerList(response.data);
        });
    };
    useEffect(() => {
        getPlayer();
    }, [playerList]);

    const getTeams = () => {
        Axios.get("http://localhost:5001/api/teams").then((response) => {
            setTeamList(response.data);
        });
    };
    useEffect(() => {
        getTeamsInfo();
    }, [teamsInfoList]);

    const getTeamsInfo = () => {
        Axios.get("leaguecontroller/leagues").then((response) => {
            setTeamInfo(response.data);
        });
    };

    const handleSelect = (e) => {
        setSelect(e.target.value);
    };


    return (
        <div>
            <p></p>
            <p></p>
            <div className="overall">
                
                <div className="toget">
                    <select className="dropdown" id="select1" onChange={handleSelect}>
                        <optgroup label="Select Team">
                            <option value="Adana Demirspor">Adana Demirspor</option>
                            <option value="Ankaragücü">Ankaragücü</option>
                            <option value="Antalyaspor">Antalyaspor</option>
                            <option value="Alanyaspor">Alanyaspor</option>
                            <option value="Başakşehir">Başakşehir</option>
                            <option value="Beşiktaş">Beşiktaş</option>
                            <option value="Fatih Karagümrük">Fatih Karagümrük</option>
                            <option value="Fenerbahçe">Fenerbahçe</option>
                            <option value="Galatasaray">Galatasaray</option>
                            <option value="Gaziantep">Gaziantep</option>
                            <option value="Giresunspor">Giresunspor</option>
                            <option value="Hatayspor">Hatayspor</option>
                            <option value="İstanbulspor">İstanbulspor</option>
                            <option value="Kasımpaşa">Kasımpaşa</option>
                            <option value="Kayserispor">Kayserispor</option>
                            <option value="Konyaspor">Konyaspor</option>
                            <option value="Sivasspor">Sivasspor</option>
                            <option value="Trabzonspor">Trabzonspor</option>
                            <option value="Ümraniyespor">Ümraniyespor</option>
                        </optgroup>
                    </select>
                    &nbsp; &nbsp;
                    <button className="button-7" onClick={getTeams}>Show Team</button>
                </div>
                <p></p>
            </div>

            <div className="teamCard">

                {teamsList.map((val, key) => {
                    if (val.teamname === select) {
                        return (
                            <>
                                <ol className="teamInfo" key={val.id} >
                                    <Card sx={{ width: 900, height: 500 }}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            src={val.logo}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h3" component="div">
                                                {val.teamname}
                                            </Typography>
                                            <Typography variant="h5" color="text.secondary" component="div">
                                                Technic Director: {val.director}
                                            </Typography>

                                            <Typography variant="h5" color="text.secondary">
                                                Stadium: {val.st_name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ol>
                                <ol className="teamInfo" key={val.id} >
                                    <Card sx={{ width: 900, height: 340 }}>
                                        <CardContent>
                                        <h3 align="center">Team League Statistics</h3>
                                            <Typography variant="body2" color="text.secondary">
                                                <div>
                                                    {teamsInfoList.map((val1, key) => {
                                                        if (val1.leagueteam === select) {
                                                            return (
                                                                <>
                                                                    <TableContainer align="center" component={Paper} padding="10px"  >
                                                                        <Table sx={{ maxWidth: 1500 }} align="center" fixedHeader={true} size="small" aria-label="a dense table">

                                                                            <TableBody>
                                                                                <TableCell align="left">League Score: </TableCell>
                                                                                <TableCell align="center">{val1.teamscore} </TableCell>
                                                                            </TableBody>
                                                                            <TableBody>
                                                                                <TableCell align="left">Total Goals Scored: </TableCell>
                                                                                <TableCell align="center">{val1.totalgoalsscored} </TableCell>
                                                                            </TableBody>
                                                                            <TableBody>
                                                                                <TableCell align="left">Total Goals Conceded: </TableCell>
                                                                                <TableCell align="center">{val1.totalgoalsconceded} </TableCell>
                                                                            </TableBody>
                                                                            <TableBody>
                                                                                <TableCell align="left">Maatches Played: </TableCell>
                                                                                <TableCell align="center">{val1.matchesplayed} </TableCell>
                                                                            </TableBody>
                                                                            <TableBody>
                                                                                <TableCell align="left">Matches Won: </TableCell>
                                                                                <TableCell align="center">{val1.matcheswon} </TableCell>
                                                                            </TableBody>
                                                                            <TableBody>
                                                                                <TableCell align="left">Matches Lost: </TableCell>
                                                                                <TableCell align="center">{val1.matcheslost} </TableCell>
                                                                            </TableBody>
                                                                            <TableBody>
                                                                                <TableCell align="left">Matches Draw: </TableCell>
                                                                                <TableCell align="center">{val1.matchestied} </TableCell>
                                                                            </TableBody>
                                                                            <TableBody>
                                                                                <TableCell align="left">Average Goals per Match: </TableCell>
                                                                                <TableCell align="center">{val1.averagegoals} </TableCell>
                                                                            </TableBody>

                                                                        </Table>
                                                                    </TableContainer>
                                                                </>
                                                            )
                                                        }
                                                    })}

                                                </div>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    
                                </ol>
                                <ol className="teamInfo" key={val.id} >
                                    <Card sx={{ width: 900, height: 900 }}>
                                        <CardContent>
                                        <h3 align="center">Team Players</h3>
                                            
                                            <Typography variant="body2" color="text.secondary">
                                                <TableContainer align="center" component={Paper} padding="1px"  >
                                                    <Table sx={{ maxWidth: 1500 }} align="center" fixedHeader={true} size="small" aria-label="a dense table">

                                                    
                                                            {playerList.map((player) => {
                                                                if (player.teamname === select) {
                                                                    return (
                                                                        <>
                                                                        <TableBody>
                                                                            <TableCell align="left">{player.p_name} ({player.p_num}) </TableCell>
                                                                            <TableCell align="center">{player.p_pos} </TableCell>
                                                                            <Avatar alt="" src={player.p_image} />
                                                                        </TableBody>
                                                                        </>
                                                                    )
                                                                }
                                                            })}
                                                           
                                                    </Table>
                                                </TableContainer>

                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ol>
                            </>
                        );
                    }
                })}
            </div>
        </div>
    )
}
