import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from '../../api/apiService';
import { Link } from 'react-router-dom';
 
const CareerShow = (props) => {
    const {cv,name  ,id   } = props?.card;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={cv}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>props.handleDelete(id)}>Delete</Button>
           <Button size="small" onClick={handleOpen}>Update</Button> 
          
        </CardActions>
      </Card>
    );
};

export default CareerShow;