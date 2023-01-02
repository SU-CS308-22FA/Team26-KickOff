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
import CommentMatch from '../components/CommentMatch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";

export default function Matchpage() {

      const [matchesList, setMatchesList] = useState([]);
      const [open, setOpen] = React.useState(false);
      const userLogin = useSelector((state) => state.userLogin);
      const { userInfo } = userLogin;
      const [id, setId] = useState("");
      const dispatch = useDispatch();

      let i = 0;
      const getTeams = () => {
            Axios.get("matchcontroller/matches").then((response) => {
                  setMatchesList(response.data);
            });
      };
      const handleClickOpen = () => {
            setOpen(true);
      };
      const handleClose = () => {
            setOpen(false);
      };

      /**
       * This function handle deleting matches.
       * Sets Id as an Id of a match that will be deleted.
       * @param {string} _id id of a match
       */
      function handleOpen(_id) {
            handleClickOpen();
            setId(_id);
      }

      /**
       * This function handles clicking "Delete Match" button
       * Deletes match with id then gets matches from database again.
       */
      async function triggerDelete() {
            try {
                  const API = "/matchcontroller/matches/" + id;
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

      useEffect(() => {
            getTeams();
      }, [matchesList]);

      return (
            <>
                  <h1 align="center">Match Results</h1>
                  <div align="center" className='matchesList'>
                        {matchesList.map((val, key) => (
                              <Paper elevation={0} sx={{ minWidth: 1500 }}>
                                    <TableContainer align="center" component={Paper} padding="10px"  >
                                    {userInfo.isAdmin && (
                                                                  <div>
                                                                        <button className='Button' onClick={() => handleOpen(val._id)}>Delete Match</button>
                                                                        <Dialog
                                                                              open={open}
                                                                              onClose={handleClose}
                                                                              aria-labelledby="alert-dialog-title"
                                                                              aria-describedby="alert-dialog-description"
                                                                        >
                                                                              <DialogTitle id="alert-dialog-title">
                                                                                    {"Delete match?"}
                                                                              </DialogTitle>
                                                                              <DialogContent>
                                                                                    <DialogContentText id="alert-dialog-description">
                                                                                          Are you sure you want to delete the match?
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
                                          <Table sx={{ maxWidth: 1500 }} align="center" fixedHeader={true} size="small" aria-label="a dense table">
                                                
                                                <TableHead>
                                                      <TableRow>
                                                            
                                                            <TableCell align="center" >Date:{val.date}</TableCell>
                                                            <TableCell align="center"></TableCell>
                                                            <TableCell align="center"> Stadium:{val.stadiumname}</TableCell>
                                                            <TableCell align="center"></TableCell>
                                                            <TableCell align="center"> Referee:{val.refereename}</TableCell>
                                                      </TableRow>
                                                </TableHead>
                                                <TableHead>
                                                      <TableRow>
                                                            <TableCell align="right" >
                                                                  <h2>{val.hometeam}</h2>
                                                            </TableCell>
                                                            <TableCell align="right">
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
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">First Half Score </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.firsthalfscoreAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.ballpossesionHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Ball Possesion </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.ballpossesionAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.totalshotsHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Total Shots </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.totalshotsAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.shotsontargetHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Shots On Target </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.shotsontargetAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.shotsonbarHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Shots On Bar </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.shotsonbarAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.cornerkicksHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Corner Kicks </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.cornerkicksAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.offsidesHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Offsides </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.offsidesAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.foulsHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Fouls </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.foulsAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.yellowcardsHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Yellow Cards </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.yellowcardsAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.redcardsHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Red Cards </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.redcardsAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.goalsavesHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Goal Saves </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.goalsavesAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.passesHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Passes </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.passesAway} </TableCell>
                                                </TableBody>
                                                <TableBody>
                                                      <TableCell align="right">{val.accpassesHome}</TableCell>
                                                      <TableCell align="center">  </TableCell>
                                                      <TableCell align="center">Accurate Passes </TableCell>
                                                      <TableCell align="center"> </TableCell>
                                                      <TableCell align="left">{val.accpassesAway} </TableCell>
                                                </TableBody>


                                          </Table>
                                    </TableContainer>
                                    <CommentMatch match={val} />
                                    <p> </p>
                              </Paper>


                        ))}
                  </div>
            </>
      )
}
