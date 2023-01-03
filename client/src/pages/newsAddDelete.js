import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Row, Col } from "react-bootstrap";
import Loading from "../components/Loading";
import { addNews } from "/Users/ozgun/Desktop/26/Team26-KickOff/client/src/actions/newsActions.js";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { TextField } from "@mui/material"
import ErrorMessage from "../components/ErrorMessage";

import '../styles/update.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NewsAddAdmin() {
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [newsTitle, setNewsTitle] = useState("");
    const [pictureLink, setNewsPictureLink] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [article, setArticle] = useState("");
    const [playerImageChecker, setArticleChecker] = useState("");
    const [imageFormat, setImageFormat] = useState(false);
    const [fillBlank, setfillBlank] = useState(false);
    const [success, setsuccess] = useState(false);

    const [openPicture, setOpenPicture] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();


    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (author && pictureLink && newsTitle && date && article) {
            setfillBlank(false);
            dispatch(addNews({ "news_title": newsTitle, "news_picture": pictureLink, "news_author": author, "news_date": date, "news_article": article }));
            setsuccess(true);
        }
        else {
            setfillBlank(true);
        }
    };

    const submitPicture = (e) => {
        e.preventDefault();
        if (validURL(playerImageChecker)) {
            setArticle(playerImageChecker);
            handleClosePicture();
            setImageFormat(false);
        }
        else {
            setImageFormat(true);
        }
    }

    const handleClickOpenPicture = () => {
        setOpenPicture(true);
    };
    const handleClosePicture = () => {
        setOpenPicture(false);
    };

    return (
        <>
            <h1 align="center">Add News</h1>
            <div>
                <Row>
                    <Col md={3}>
                        <p> </p>
                    </Col>
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {fillBlank ?
                                <ErrorMessage variant="danger">
                                    Please fill all blanks
                                </ErrorMessage> : null}
                            <p> </p>
                            {imageFormat ?
                                <ErrorMessage variant="danger">
                                    Please enter valid URL
                                </ErrorMessage> : null}
                            {success && (
                                <ErrorMessage variant="success">
                                    News Added Successfully
                                </ErrorMessage>
                            )}
                            <p> </p>
                            <div className="d-flex" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <img
                                    src={pictureLink ? pictureLink : "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vdGJhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"}
                                    alt="account upload"
                                    width={800}
                                    height={300}
                                />

                            </div>

                            <p> </p>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter News Title'
                                id="Title"
                                label="Title"
                                name="author"
                                value={newsTitle}
                                onChange={(e) => setNewsTitle(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter News Picture Link'
                                id="PictureLink"
                                label="Picture Link"
                                name="pictureLink"
                                value={pictureLink}
                                onChange={(e) => setNewsPictureLink(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter News Author'
                                id="Author"
                                label="Author"
                                name="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                autoFocus
                            />
                            <p> </p>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='i.e. 14 May 2022'
                                id="Date"
                                label="Date"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                autoFocus
                                
                            />
                            <p> </p>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                placeholder='Enter News Article'
                                id="Article"
                                label="Article"
                                name="article"
                                value={article}
                                onChange={(e) => setArticle(e.target.value)}
                                autoFocus
                            />
                            <p> </p>

                            <Row >
                                <Col md={6}>
                                    <Button id="myButton" sx={{ mt: 2, mb: 2, mr: 2 }} variant="contained" color="primary" type="submit" varient="primary">
                                        Add News
                                    </Button>

                                </Col>
                            </Row>

                        </Form>

                    </Col>


                </Row>

            </div>
        </>
    );
}