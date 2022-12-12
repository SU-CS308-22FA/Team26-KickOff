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
        <div>
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
                            <option value="Fatih Karagümrük	">Fatih Karagümrük</option>
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
                            <option value="Fatih Karagümrük	">Fatih Karagümrük</option>
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

            <div>
            
            </div>


        </div>
    )
}