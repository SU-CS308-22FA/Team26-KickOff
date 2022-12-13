import {useState, useEffect} from 'react'
import Axios from 'axios';
import '../styles/league.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function League() {

    const [teamsList, setTeamList] = useState([]);

    let i = 0;
    /**
     * This function get league details from database and put them in a list named teamsList
     */
    const getTeams = () => {
      Axios.get("leaguecontroller/leagues").then((response) => {
        setTeamList(response.data);
      });
    };
    useEffect(() => {
        getTeams();
	}, [teamsList]);
    

    return (
        <>
                <h1 align="center">Spor Toto Super League Leaderboard</h1>
                <div align="center">
                  <TableContainer  align="center" component={Paper}  sx={{ maxWidth: 1600 }} >
                  <Table sx={{ maxWidth: 1200 }} align="center" fixedHeader={true} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: "2%" }} align="center" font-Weight="bold">
                          <h2>Pos.</h2>
                        </TableCell>
                        <TableCell  style={{ width: "10px" }}align="center">
                        <h2>Team List</h2>
                        </TableCell>
                        <TableCell style={{ width: "10px" }}align="right">
                        <h2>Played</h2>
                        </TableCell>
                        <TableCell style={{ width: "10px" }}align="right">
                        <h2>Won</h2>
                        </TableCell>
                        <TableCell style={{ width: "10px" }}align="right">
                        <h2>Tied</h2>
                        </TableCell>
                        <TableCell style={{ width: "10px" }}align="right">
                        <h2>Lost</h2>
                        </TableCell>
                        <TableCell style={{ width: "10px" }}align="right">
                        <h2>Scored</h2>
                        </TableCell>
                        <TableCell style={{ width: "10px" }}align="right">
                        <h2>Conceded</h2>
                        </TableCell>
                        <TableCell style={{ width: "10px" }}align="right">
                        <h2>Diff.</h2>
                        </TableCell>
                        <TableCell style={{ width: "10px" }}align="right">
                        <h2>Points</h2>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teamsList.map((val,key) => (
                        <TableRow
                          key={val.teamscore}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center" component="th" scope="row" sx={i++}>{i}</TableCell>
                          <TableCell align= "center"> {val.leagueteam} </TableCell>
                          <TableCell align="right">{val.matchesplayed}</TableCell>
                          <TableCell align="right">{val.matcheswon}</TableCell>
                          <TableCell align="right">{val.matchestied}</TableCell>
                          <TableCell align="right">{val.matcheslost}</TableCell>
                          <TableCell align="right">{val.totalgoalsscored}</TableCell>
                          <TableCell align="right">{val.totalgoalsconceded}</TableCell>
                          <TableCell align="right">{val.averagegoals}</TableCell>
                          <TableCell align="right">{val.teamscore}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
        </>
    )
}
