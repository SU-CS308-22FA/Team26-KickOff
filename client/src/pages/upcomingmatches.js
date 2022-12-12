import {useState, useEffect} from 'react'
import Axios from 'axios';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Matchpage() {

    const [upcomingmatchesList, setMatchesList] = useState([]);

    let i = 0;
    const getTeams = () => {
      Axios.get("upcomingmatchcontroller/matches").then((response) => {setMatchesList(response.data);
      });
    };
    useEffect(() => {
        getTeams();
	}, [upcomingmatchesList]);

    return (
        <>
            <h1 align="center">Upcoming Matches</h1>
            {upcomingmatchesList.map((val,key) => (
                <Paper elevation={12} sx={{maxWidth:1500}} width="50%"  >
                <TableContainer  align="center" component={Paper} padding="10px"  >
                <Table sx={{ maxWidth: 1500 }} align="center" fixedHeader={true} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                      <TableCell  align="center" >Date:{val.dateU}</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell  align="center"> Stadium:{val.stadiumnameU}</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"> Referee:{val.refereenameU}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow>
                      <TableCell  align="right" >
                      <h2>{val.hometeamU}</h2>
                      </TableCell>
                      <TableCell  align="right">
                      <h2>-</h2>
                      </TableCell>
                      <TableCell align="center">
                      <h2>:</h2>
                      </TableCell>
                      <TableCell align="left">
                      <h2>-</h2>
                      </TableCell>
                      <TableCell align="left">
                      <h2>{val.awayteamU}</h2>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
              <p> </p>   
              </Paper>

            ))}      
        </>
    )
}