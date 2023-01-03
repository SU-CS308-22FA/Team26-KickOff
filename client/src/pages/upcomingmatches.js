import { useState, useEffect } from 'react'
import Axios from 'axios';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Matchpage() {
  const [open, setOpen] = React.useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [upcomingMatchesList, setUpcomingMatchesList] = useState([]);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  let i = 0;
  /**
   * This function get upcoming matches from database and put them in a list named upcomingMatchesList
   */
  const getTeams = () => {
    Axios.get("upcomingmatchcontroller/upcomingmatches").then((response) => {
      setUpcomingMatchesList(response.data);
    });
  };
  useEffect(() => {
    getTeams();
  }, [upcomingMatchesList]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleOpen(_id) {
    handleClickOpen();
    setId(_id);
}

  async function triggerDelete() {
    try {
      const API = "/upcomingmatchcontroller/upcomingmatches/" + id;
      const { data } = await Axios.delete(API);

      getTeams();
      handleClose();
      dispatch({ type: "MATCH_DELETE_SUCCESS", payload: data });

    } catch (error) {
      dispatch({
        type: "MATCH_DELETE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  return (
    <>
      <div align="center" justify-content="center">
        <h1 align="center">Upcoming Matches</h1>
        {upcomingMatchesList.map((val, key) => (
          <Paper sx={{ maxWidth: 1500 }} width="50%">
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: 1500 }} fixedHeader={true} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {userInfo.isAdmin && (
                      <div>
                        <button className='Button' onClick={() => handleOpen(val._id)}>Delete Upcoming Match</button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Delete Upcoming Match?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure you want to delete the upcoming match?
                                                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={() => triggerDelete()} autoFocus>
                              Yes
                                                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    )}

                    <TableCell align="left" >Date:{val.dateU}</TableCell>
                    <TableCell align="center"> Stadium:{val.stadiumnameU}</TableCell>
                    <TableCell align="right"> Referee:{val.refereenameU}</TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" >
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