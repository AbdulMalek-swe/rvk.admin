import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from '../../api/apiService';
import { Link } from 'react-router-dom';
import Update from './Update';

const ShowEvents = (props) => {
    const {event_image,event_name ,details,id   } = props?.card;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={event_image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {event_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>props.handleDelete(id)}>Delete</Button>
           <Button size="small" onClick={handleOpen}>Update</Button> 
            <Update open={open} handleClose={handleClose} handleOpen={handleOpen} id={id} />
        </CardActions>
      </Card>
    );
};

export default ShowEvents;