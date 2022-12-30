import React from 'react'
import { Paper, Typography } from "@mui/material"
import { useState, useEffect } from 'react'
import Axios from 'axios';
import "../styles/home.css"
//import "/Users/ozgun/Desktop/26/Team26-KickOff/routes/leaguecontroller.js"
import { useSelector } from "react-redux";


const Homepage = () => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [teamsList, setTeamList] = useState([]);
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

    const [playersList, setPlayerList] = useState([]);
    /**
     * This function get league details from database and put them in a list named teamsList
     */
    const getPlayers = () => {
        Axios.get("api/players").then((response) => {
            setPlayerList(response.data);
        });
    };
    useEffect(() => {
        getPlayers();
    }, [playersList]);

    const [stadiumsList, setStadiumsList] = useState([]);
    /**
     * This function get news from database and put them in a list named newsList
     */
    const getStadiums = () => {
        Axios.get("stadiumsscontroller/stadiums").then((response) => {
            setStadiumsList(response.data);
        });
    };
    useEffect(() => {
        getStadiums();
    }, [stadiumsList]);

    const [matchesList, setMatchesList] = useState([]);
    /**
     * This function get news from database and put them in a list named newsList
     */
    const getMatches = () => {
        Axios.get("matchcontroller/matches").then((response) => {
            setMatchesList(response.data);
        });
    };
    useEffect(() => {
        getMatches();
    }, [matchesList]);

    const [upcomingmatchesList, setUpcomingMatchesList] = useState([]);
    /**
     * This function get news from database and put them in a list named newsList
     */
    const getUpcomingMatches = () => {
        Axios.get("upcomingmatchcontroller/upcomingmatches").then((response) => {
            setUpcomingMatchesList(response.data);
        });
    };
    useEffect(() => {
        getUpcomingMatches();
    }, [upcomingmatchesList]);

    let i = 0;
    let j = 0;

    return (
        <>
            <div>
                <div className="banner-container">
                    {userInfo && (
                        <div className='row' align="center">
                            <div className='do'>
                                {teamsList.map((val, key) => (
                                    <div sx={j++}>
                                        {userInfo.supportedTeam === val.leagueteam && (
                                            <div className='do'>
                                                <div className='do'>

                                                    <div class="patterns">
                                                        <svg width="100%" height="100%">
                                                            <text x="50%" y="60%" text-anchor="middle"  >
                                                                Welcome to KickOFF {userInfo.username}!
                                                            </text>
                                                        </svg>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <div style={{ flex: 1, backgroundColor: "#ffffff", height: "3px" }} />
                                                        <Typography className="text-white text-10xl mt-10" fontSize={30}>Leaderboard stats of {userInfo.supportedTeam}</Typography>
                                                        <div style={{ flex: 1, backgroundColor: "#ffffff", height: "3px" }} />
                                                    </div>
                                                    <p></p>
                                                    <div className="row" align="center">
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Rank</Typography>
                                                                <Typography fontSize={70} color="white">{j}</Typography>
                                                            </Paper>
                                                        </div>
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Played</Typography>
                                                                <Typography fontSize={70} color="white">{val.matchesplayed}</Typography>
                                                            </Paper>
                                                        </div>
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Won</Typography>
                                                                <Typography fontSize={70} color="white">{val.matcheswon}</Typography>
                                                            </Paper>
                                                        </div>
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Tied</Typography>
                                                                <Typography fontSize={70} color="white">{val.matchestied}</Typography>
                                                            </Paper>
                                                        </div>
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Lost</Typography>
                                                                <Typography fontSize={70} color="white">{val.matcheslost}</Typography>
                                                            </Paper>
                                                        </div>
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Scored</Typography>
                                                                <Typography fontSize={70} color="white">{val.totalgoalsscored}</Typography>
                                                            </Paper>
                                                        </div>
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Conc.</Typography>
                                                                <Typography fontSize={70} color="white">{val.totalgoalsconceded}</Typography>
                                                            </Paper>
                                                        </div>
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Diff.</Typography>
                                                                <Typography fontSize={70} color="white">{val.averagegoals}</Typography>
                                                            </Paper>
                                                        </div>
                                                        <div className='col' align="center">
                                                            <Paper className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                <Typography fontSize={30} color="white" fontWeight={800}>Points</Typography>
                                                                <Typography fontSize={70} color="white">{val.teamscore}</Typography>
                                                            </Paper>
                                                        </div>

                                                    </div>

                                                </div>



                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='row' align="center">
                                <div className='col'>
                                    <Typography fontSize={25} color="white" fontWeight={800}>Players of {userInfo.supportedTeam}</Typography>
                                    <Paper className='paperprop2' elevation={0}>
                                        <Paper className='paperprop' elevation={0}>
                                            <Typography fontSize={20} color="white" fontWeight={800}>Goalkeepers</Typography>
                                            {playersList.map((val2, key) => (
                                                <div>
                                                    {userInfo.supportedTeam === val2.teamname && (
                                                        <div>
                                                            <div className="text-center" >
                                                                <div className="row" padding="8px" justifyContent="space-evenly" align="center">
                                                                    <div className='col'>
                                                                        {val2.p_pos === "Goalkeeper" && (
                                                                            <Paper align="center" className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                                <div className='row' >
                                                                                    <Typography fontSize={15} color="white">{val2.p_num} - {val2.p_name}</Typography>
                                                                                </div>
                                                                            </Paper>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </Paper>
                                        <Paper className='paperprop' elevation={0}>
                                            <Typography fontSize={20} color="white" fontWeight={800}>Defenses</Typography>
                                            {playersList.map((val2, key) => (
                                                <div>
                                                    {userInfo.supportedTeam === val2.teamname && (
                                                        <div>
                                                            <div className="text-center" >
                                                                <div className="row" padding="8px" justifyContent="space-evenly" align="center">
                                                                    <div className='col'>
                                                                        {val2.p_pos === "Defense" && (
                                                                            <Paper align="center" className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                                <div className='row' >
                                                                                    <Typography fontSize={15} color="white">{val2.p_num} - {val2.p_name}</Typography>
                                                                                </div>
                                                                            </Paper>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </Paper>
                                        <Paper className='paperprop' elevation={0}>
                                            <Typography fontSize={20} color="white" fontWeight={800}>Midfielders</Typography>
                                            {playersList.map((val2, key) => (
                                                <div>
                                                    {userInfo.supportedTeam === val2.teamname && (
                                                        <div>
                                                            <div className="text-center" >
                                                                <div className="row" padding="8px" justifyContent="space-evenly" align="center">
                                                                    <div className='col'>
                                                                        {val2.p_pos === "Midfielder" && (
                                                                            <Paper align="center" className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                                <div className='row' >
                                                                                    <Typography fontSize={15} color="white">{val2.p_num} - {val2.p_name}</Typography>
                                                                                </div>
                                                                            </Paper>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </Paper>
                                        <Paper className='paperprop' elevation={0}>
                                            <Typography fontSize={20} color="white" fontWeight={800}>Forwards</Typography>
                                            {playersList.map((val2, key) => (
                                                <div>
                                                    {userInfo.supportedTeam === val2.teamname && (
                                                        <div>
                                                            <div className="text-center" >
                                                                <div className="row" padding="8px" justifyContent="space-evenly" align="center">
                                                                    <div className='col'>
                                                                        {val2.p_pos === "Forward" && (
                                                                            <Paper align="center" className="paperprop" elevation={0} sx={{ width: "100%" }}>
                                                                                <div className='row' >
                                                                                    <Typography fontSize={15} color="white">{val2.p_num} - {val2.p_name}</Typography>
                                                                                </div>
                                                                            </Paper>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </Paper>
                                    </Paper>
                                </div>

                                <div className='col'>
                                    <Typography fontSize={25} color="white" fontWeight={800}>Last Match Stats of {userInfo.supportedTeam}</Typography>
                                    {matchesList.map((val3, key) => (
                                        <div>
                                            {((userInfo.supportedTeam === val3.hometeam) && (i === 0)) && (
                                                <div>
                                                    <div className="text-center">
                                                        <div className="row" padding="8px" justifyContent="space-evenly">
                                                            <div className='col'>
                                                                <Paper align="center" className="paperprop" elevation={0} sx={{ width: "100px" }}>
                                                                    <div className='row' sx={i++} >
                                                                        <Typography fontSize={15} color="white">{val3.secondhalfscoreHome} - {val3.hometeam} - {val3.awayteam} - {val3.secondhalfscoreAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Date: {val3.date}</Typography>
                                                                        <Typography fontSize={15} color="white">Stadium: {val3.stadiumname}</Typography>
                                                                        <Typography fontSize={15} color="white">Referee: {val3.refereename}</Typography>
                                                                        <Typography fontSize={15} color="white">Ball Posesion: {val3.ballpossesionHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Shots: {val3.totalshotsHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Corners: {val3.cornerkicksHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Offsides: {val3.offsidesHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Fouls: {val3.foulsHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Yellow Cards: {val3.yellowcardsHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Red Cards: {val3.redcardsHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Saves: {val3.goalsavesHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Passes: {val3.passesHome}</Typography>
                                                                        <Typography fontSize={15} color="white">Acc. Passes: {val3.accpassesHome}</Typography>

                                                                    </div>

                                                                </Paper>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {((userInfo.supportedTeam === val3.awayteam) && (i === 0)) && (
                                                <div>
                                                    <div className="text-center">
                                                        <div className="row" padding="8px" justifyContent="space-evenly">
                                                            <div className='col'>
                                                                <Paper elevation={0} align="center" className="paperprop2" sx={{ width: "50" }} >
                                                                    <div className='row' sx={i++} >
                                                                        <Typography fontSize={15} color="white">{val3.secondhalfscoreHome} - {val3.hometeam} - {val3.awayteam} - {val3.secondhalfscoreAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Date: {val3.date}</Typography>
                                                                        <Typography fontSize={15} color="white">Stadium: {val3.stadiumname}</Typography>
                                                                        <Typography fontSize={15} color="white">Referee: {val3.refereename}</Typography>
                                                                        <Typography fontSize={15} color="white">Ball Posesion: {val3.ballpossesionAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Shots: {val3.totalshotsAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Corners: {val3.cornerkicksAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Offsides: {val3.offsidesAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Fouls: {val3.foulsAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Yellow Cards: {val3.yellowcardsAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Red Cards: {val3.redcardsAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Saves: {val3.goalsavesAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Passes: {val3.passesAway}</Typography>
                                                                        <Typography fontSize={15} color="white">Acc. Passes: {val3.accpassesAway}</Typography>

                                                                    </div>

                                                                </Paper>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <Typography fontSize={25} color="white" fontWeight={800}>Upcoming Match of {userInfo.supportedTeam}</Typography>
                                    {upcomingmatchesList.map((val4, key) => (
                                        <div align="center">
                                            {((userInfo.supportedTeam === val4.hometeamU) && (i === 1)) && (
                                                <div>
                                                    <div className="text-center">
                                                        <div padding="8px" justifyContent="space-evenly">
                                                            <div align="center">
                                                                <Paper justify-content="center" className="paperprop" elevation={0} >
                                                                    <div className='row' sx={i++} align="center">
                                                                        <Typography fontSize={15} color="white">{val4.hometeamU} - {val4.awayteamU}</Typography>
                                                                        <Typography fontSize={15} color="white">Date: {val4.dateU} </Typography>
                                                                        <Typography fontSize={15} color="white">Stadium: {val4.stadiumnameU}</Typography>
                                                                        <Typography fontSize={15} color="white">Referee: {val4.refereenameU}</Typography>
                                                                    </div>
                                                                </Paper>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <footer>For bug report please contact: bturan@sabanciuniv.edu</footer>
            </div>
        </>
    )
}
export default Homepage