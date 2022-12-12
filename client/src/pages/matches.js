import {useState, useEffect} from 'react'
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
import CommentMatch from '../components/CommentMatch';

export default function Matchpage() {

    const [matchesList, setMatchesList] = useState([]);

    let i = 0;
    const getTeams = () => {
      Axios.get("matchcontroller/matches").then((response) => {setMatchesList(response.data);
      });
    };
    useEffect(() => {
        getTeams();
	}, [matchesList]);

    return (
        <>
            <h1 align="center">Match Results</h1>
            {matchesList.map((val,key) => (
                <Paper elevation={12} sx={{maxWidth:1500}} width="50%"  >
                <TableContainer  align="center" component={Paper} padding="10px"  >
                <Table sx={{ maxWidth: 1500 }} align="center" fixedHeader={true} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                      <TableCell  align="center" >Date:{val.date}</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell  align="center"> Stadium:{val.stadiumname}</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"> Referee:{val.refereename}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow>
                      <TableCell  align="right" >
                      <h2>{val.hometeam}</h2>
                      </TableCell>
                      <TableCell  align="right">
                      <h2>{val.secondhalfscoreHome}</h2>
                      </TableCell>
                      <TableCell align="center">
                      <h2>-</h2>
                      </TableCell>
                      <TableCell align="left">
                      <h2>{val.secondhalfscoreAway}</h2>
                      </TableCell>
                      <TableCell align="left">
                      <h2>{val.awayteam}</h2>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                        <TableCell align="right">{val.firsthalfscoreHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">First Half Score </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.firsthalfscoreAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.ballpossesionHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Ball Possesion </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.ballpossesionAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.totalshotsHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Total Shots </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.totalshotsAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.shotsontargetHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Shots On Target </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.shotsontargetAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.shotsonbarHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Shots On Bar </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.shotsonbarAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.cornerkicksHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Corner Kicks </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.cornerkicksAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.offsidesHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Offsides </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.offsidesAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.foulsHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Fouls </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.foulsAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.yellowcardsHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Yellow Cards </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.yellowcardsAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.redcardsHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Red Cards </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.redcardsAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.goalsavesHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Goal Saves </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.goalsavesAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.passesHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Passes </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.passesAway} </TableCell>
                  </TableBody>
                  <TableBody>
                        <TableCell align="right">{val.accpassesHome}</TableCell>
                        <TableCell align= "center">  </TableCell>
                        <TableCell align="center">Accurate Passes </TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="left">{val.accpassesAway} </TableCell>
                  </TableBody>

                  
                </Table>
              </TableContainer>
              <CommentMatch match = {val}/>
              <p> </p>   
              </Paper>

            ))}      
        </>
    )
}
