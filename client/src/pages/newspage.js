import {useState, useEffect} from 'react'
import Axios from 'axios';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [newsList, setNewsList] = useState([]);

  let i = 0;
  const getTeams = () => {
    Axios.get("newscontroller/news").then((response) => {setNewsList(response.data);
    });
  };
  useEffect(() => {
      getTeams();
  }, [newsList]);

  return (
    <div  expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{maxWidth: 1200}}>
    {newsList.map((val,key) => (
        <div justify-content="center" align="center" >
            <img
				src={val.news_picture ? val.news_picture : "https://cdn-icons-png.flaticon.com/512/18/18601.png"}
				alt="news image for heading"
				width={1200}
				height={300}
			/>
        <Accordion sx={{maxWidth: 1200}}>
            
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                <h3>{val.news_title}</h3>
            </Typography>
            <Typography sx={{ width: '33%', color: 'text.secondary' }}>{val.news_author}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>{val.news_article}</Typography>
            </AccordionDetails>
        </Accordion>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        </div>
        ))}
    </div>
  );
}