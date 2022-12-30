import { useState, useEffect } from 'react'
import Axios from 'axios';
import "../styles/newspage.css"
import * as React from 'react';
import { Paper, Container } from "@mui/material"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ControlledAccordions() {

  const [open, setOpen] = React.useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [id, setId] = useState("");
  const dispatch = useDispatch();

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

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [newsList, setNewsList] = useState([]);

  let i = 0;
  /**
   * This function get news from database and put them in a list named newsList
   */
  const getNews = () => {
    Axios.get("newscontroller/news").then((response) => {
      setNewsList(response.data);
    });
  };
  useEffect(() => {
    getNews();
  }, [newsList]);

  /**
       * This function handles clicking "Delete Match" button
       * Deletes match with id then gets matches from database again.
       */
  async function triggerDelete() {
    try {
      const API = "/newscontroller/news/" + id;
      const { data } = await Axios.delete(API);

      getNews();
      handleClose();
      dispatch({ type: "NEWS_DELETE_SUCCESS", payload: data });

    } catch (error) {
      dispatch({
        type: "NEWS_DELETE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }


  return (
    <div expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ maxWidth: 1200 }} >
      <p></p>
      <p></p>
      <h1 align="center"> News </h1>
      <p></p>
      <p></p>
      <p></p>
      <div className='newsList'>
        {newsList.map((val, key) => (
          <div justify-content="center" align="center"  >
            <Container className='contfornews' >
              {userInfo.isAdmin && (
                <div >
                  <button className='button2' color="blue" margin="300" onClick={() => handleOpen(val._id)}>Delete Match</button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Delete news?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this news?
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
              <img
                src={val.news_picture ? val.news_picture : "https://cdn-icons-png.flaticon.com/512/18/18601.png"}
                alt="news image for heading"
                border-radius={8}
                width={800}
                height={300}

              />

              <Accordion sx={{ maxWidth: 800 }}>

                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '80%', flexShrink: 0 }}>

                    <h3 align="left">{val.news_title}
                    </h3>

                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <Typography align="right" sx={{ color: 'text.secondary' }}>{val.news_author} - {val.news_date}</Typography>

                  </div>
                  <Typography align="left">{val.news_article}</Typography>
                </AccordionDetails>
              </Accordion>
            </Container>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
}