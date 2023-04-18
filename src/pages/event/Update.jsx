import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from '../../api/apiService';
import Grid from '@mui/material/Grid';
import { toast } from 'react-hot-toast';
 
 
 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Upstart = (props) => {
    const formData = new FormData()
    const handleImage = e => {
        formData.append("event_image", e.target.files[0]);
    }
    const [event,setEvent]= useState({});
    useEffect(()=>{
        axios.get(`/api/events/${props.id}`)
        .then(res=>{
            console.log(res);
            setEvent(res.data)
        })
        .catch(error=>{
            toast.error("can not fetch event")
        })
    },[])
      
    const handleName = e =>{
       const u = {event_name:e.target.value,event_price:event.event_price,host_name:event.host_name,start:event.start,details:event.details,capacity:event.capacity,location:event.location}
       setEvent(u)
    }
    const handlePrice = e =>{
        const u = {event_name:event.event_name,event_price:e.target.value,host_name:event.host_name,start:event.start,details:event.details,capacity:event.capacity,location:event.location}
        setEvent(u)
     }
     const handleHost = e =>{
        const u = {event_name:event.event_name,event_price:event.event_price,host_name:e.target.value,start:event.start,details:event.details,capacity:event.capacity,location:event.location}
        setEvent(u)
     }
     const handlestart = e =>{
        const u = {event_name:event.event_name,event_price:event.event_price,host_name:event.host_name,start:e.target.value,details:event.details,capacity:event.capacity,location:event.location}
        setEvent(u)
     }
     const handleCap = e =>{
        const u = {event_name:event.event_name,event_price:event.event_price,host_name:event.host_name,start:event.start,details:event.details,capacity:e.target.value,location:event.location}
        setEvent(u)
     }
     const handleDes = e =>{
        const u = {event_name:event.event_name,event_price:event.event_price,host_name:event.host_name,start:event.start,details:e.target.value,capacity:event.capacity,location:event.location}
        setEvent(u)
     }
     const handleLoc = e =>{
        const u = {event_name:event.event_name,event_price:event.event_price,host_name:event.host_name,start:event.start,details:event.details,capacity:event.capacity,location:e.target.value}
        setEvent(u)
     }

     const onSubmit = data => {
        formData.append("event_name", event.event_name)
        formData.append("event_price",event.event_price)
        formData.append("host_name",event.host_name)
        formData.append("location",event.location)
        formData.append("start",event.start)
        formData.append("details",event.details)
        formData.append("capacity",event.capacity)
        formData.append("id",props.id)
        axios.patch(`/api/events/`, formData)
            .then(res => {
                console.log(res);
                toast.success("successfully added event")
            })
            .catch(error=>{
                toast.error("can not add event")
            })
    }
    return (
      
<Modal
  open={props.open}
  onClose={props.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-details"
  sx={{background:"white"}}
>
   <form >
            <Grid container spacing={6}>
         <Grid item xs={12} sm={6}>
         <TextField id="outlined-basic" label="event_name" variant="outlined"   required type='text' sx={{ width: "100%",m:1 }} onChange={handleName} value={event.event_name || ""} />
        
            <TextField id="outlined-basic" label="event_price" variant="outlined"  required type='number' sx={{ width: "100%", m:1}}onChange={handlePrice} value={event.event_price || ""}   />
             
            <TextField id="outlined-basic" label="host_name" variant="outlined"  required type='text' sx={{ width: "100%", m:1 }} onChange={handleHost} value={event.host_name || ""}/>
            
            <TextField id="outlined-basic" variant="outlined" onChange={handleImage} required type='file' sx={{ width: "100%", m:1 }}  />
           
         </Grid>
         <Grid item xs={12} sm={6}>
         
        
            <TextField id="outlined-basic" variant="outlined"   required type='date' sx={{ width: "100%",m:1 }} onChange={handlestart}  />
            <TextField id="outlined-basic" label="capacity" variant="outlined"  required type='number' sx={{ width: "100%", m:1}} onChange={handleCap} value={event.capacity || ""} />
            <TextField id="outlined-basic" label="details" variant="outlined" multiline
                rows={2}
                 required type='text' sx={{ width: "100%",m:1 }}  onChange={handleDes} value={event.details || ""}/>
                      <TextField id="outlined-basic" label="location" variant="outlined"   required type='text' sx={{ width: "100%",m:1 }} onChange={handleLoc} value={event.location || ""} />
</Grid>
            </Grid>
            <br /><br />
            <CardActions>
                <Button onClick={onSubmit} variant="contained" color="success" type='submit' sx={{ width: "100%", }} >
                    Add Event
                </Button>
            </CardActions>
        </form>
</Modal>
  
    );
};

export default Upstart;