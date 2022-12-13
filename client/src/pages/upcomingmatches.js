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

    const [upcomingMatchesList, setUpcomingMatchesList] = useState([]);

    let i = 0;
    /**
     * This function get upcoming matches from database and put them in a list named upcomingMatchesList
     */
    const getTeams = () => {
      Axios.get("upcomingmatchcontroller/upcomingmatches").then((response) => {setUpcomingMatchesList(response.data);
      });
    };
    useEffect(() => {
        getTeams();
	}, [upcomingMatchesList]);

    return (
        <>
        <div align="center" justify-content="center">
            <h1 align="center">Upcoming Matches</h1>
            {upcomingMatchesList.map((val,key) => (
            <Paper sx={{maxWidth:1500}} width="50%">
              <TableContainer   component={Paper}>
                <Table sx={{ maxWidth: 1500 }} fixedHeader={true} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell  align="left" >Date:{val.dateU}</TableCell>
                      <TableCell  align="center"> Stadium:{val.stadiumnameU}</TableCell>
                      <TableCell align="right"> Referee:{val.refereenameU}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow>
                      <TableCell  align="left" >
                      <h3>{val.hometeamU}</h3>
                      </TableCell>
                      <TableCell align="center">
                      <h3>-</h3>
                      </TableCell>

                      <TableCell align="right">
                      <h3>{val.awayteamU}</h3>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Paper>
            ))}   
          </div>   
        </>
    )
}
