import { useState, useEffect } from 'react'
import Axios from 'axios';
import '../styles/matches.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TeamComparison() {

    const [select1, setSelect1] = useState("");
    const [select2, setSelect2] = useState("");
    const [teamsList, setTeamList] = useState([]);

    let team1 = "";
    let team2 = "";

    let i = 0;
    const getTeams = () => {
        Axios.get("leaguecontroller/leagues").then((response) => {
            setTeamList(response.data);
        });
    };
    useEffect(() => {
        getTeams();
    }, [teamsList]);


    const handleSelect1 = (e) => {
        setSelect1(e.target.value);
    }

    const handleSelect2 = (e) => {
        setSelect2(e.target.value);
    }

    return (
        <div className="whole">
            <div className="search">
                <p></p>
                <div className="toget">
                    <select className="dropdown" id="select1" onChange={handleSelect1}>
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
                    <select className="dropdown" id="select2" onChange={handleSelect2}>
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
                    <button className="button-7" onClick={getTeams}>Compare</button>
                </div>

                <p></p>
            </div>
            {teamsList.map((val, key) => {
                if (val.leagueteam == select1) {
                    team1 = val
                }
                if (val.leagueteam == select2) {
                    team2 = val
                }

            })}

            <h1 align="center">Teams Comparsion</h1>
            <div justify-content="center" align="center">
                <Paper elevation={12} sx={{ maxWidth: 1500 }} width="50%"  >
                    <TableContainer align="center" component={Paper} padding="8px"  >
                        <Table sx={{ maxWidth: 1500 }} align="center" fixedHeader={true} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" >
                                        <h2>{team1.leagueteam}</h2>
                                    </TableCell>
                                    <TableCell align="right">
                                        <h2></h2>
                                    </TableCell>
                                    <TableCell align="center">
                                        <h2>{team1.leaguename} - {team1.leagueyear}</h2>
                                    </TableCell>
                                    <TableCell align="left">
                                        <h2></h2>
                                    </TableCell>

                                    <TableCell align="left">
                                        <h2>{team2.leagueteam}</h2>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align="right">{team1.teamscore}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Score</TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{team2.teamscore} </TableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell align="right">{team1.totalgoalsscored}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Total Goals Scored</TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{team2.totalgoalsscored} </TableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell align="right">{team1.totalgoalsconceded}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Total Goals Conceded</TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{team2.totalgoalsconceded} </TableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell align="right">{team1.matchesplayed}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Matches Played </TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{team2.matchesplayed} </TableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell align="right">{team1.matcheswon}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Matches Won </TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{team2.matcheswon} </TableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell align="right">{team1.matcheslost}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Matches Lost </TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{team2.matcheslost} </TableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell align="right">{team1.matchestied}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Matches Draw </TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{team2.matchestied} </TableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell align="right">{team1.averagegoals}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Average Goal </TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{team2.averagegoals} </TableCell>
                            </TableBody>
                            <TableBody>
                                <TableCell align="right">{(team1.teamscore/team1.matchesplayed).toFixed(2)}</TableCell>
                                <TableCell align="center">  </TableCell>
                                <TableCell align="center">Point Per Match </TableCell>
                                <TableCell align="center"> </TableCell>
                                <TableCell align="left">{(team2.teamscore/team2.matchesplayed).toFixed(2)} </TableCell>
                            </TableBody>


                        </Table>
                    </TableContainer>
                    <p> </p>
                </Paper>
            </div>








            <div>

            </div>


        </div>
    )
}