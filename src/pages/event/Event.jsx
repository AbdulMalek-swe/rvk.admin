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
import ShowEvents from './ShowEvents';
import { Typography } from '@material-tailwind/react';
 
const Event = () => {
    const { register, handleSubmit } = useForm()
    const formData = new FormData()
    const handleImage = e => {
        formData.append("event_image", e.target.files[0]);
    }
    const onSubmit = data => {
        formData.append("event_name", data.ename)
        formData.append("event_price", data.eprice)
        formData.append("host_name", data.hname)
        formData.append("location", data.location)
        formData.append("start", data.start)
        formData.append("details", data.desc)
        formData.append("capacity", data.cap)
        axios.post("/api/events/", formData)
            .then(res => {
                console.log(res);
                toast.success("successfully added event")
            })
            .catch(error=>{
                toast.error("can not add event")
            })
    }
    const [event,setEvent]= useState([]);
    useEffect(()=>{
        axios.get("/api/events/")
        .then(res=>{
            console.log(res.data);
            setEvent(res.data)
        })
        .catch(error=>{
            toast.error("can not fetch event")
        })
    },[])
    const handleDelete = e =>{
        axios.delete(`/api/events/${e}/`).then(res=>{
          const filter = event.filter(item=>item.id!=e)
          setEvent(filter)
          toast.success("successfully delete the data")
        })
        .catch(er=>{
            toast.error("can not possible to delete event")
        })
     }
    return (
        <Box align="center" sx={{ marginTop: "10px" }}>
            <Card sx={{ padding: "12px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={6}>
                 <Grid item xs={12} sm={6}>
                 <TextField id="outlined-basic" label="event_name" variant="outlined" {...register("ename")} required type='text' sx={{ width: "100%",m:1 }} />
                
                    <TextField id="outlined-basic" label="event_price" variant="outlined" {...register("eprice")} required type='number' sx={{ width: "100%", m:1}} />
                     
                    <TextField id="outlined-basic" label="host_name" variant="outlined" {...register("hname")} required type='text' sx={{ width: "100%", m:1 }} />
                    
                    <TextField id="outlined-basic" variant="outlined" onChange={handleImage} required type='file' sx={{ width: "100%", m:1 }} />
                   
                 </Grid>
                 <Grid item xs={12} sm={6}>
                 
                
                    <TextField id="outlined-basic" variant="outlined" {...register("start")} required type='date' sx={{ width: "100%",m:1 }} />
                    <TextField id="outlined-basic" label="capacity" variant="outlined" {...register("cap")} required type='number' sx={{ width: "100%", m:1}} />
                    <TextField id="outlined-basic" label="capacity" variant="outlined" {...register("location")} required type='number' sx={{ width: "100%", m:1}} />
                    <TextField id="outlined-basic" label="description" variant="outlined" multiline
                        rows={2}
                        {...register("desc")} required type='text' sx={{ width: "100%",m:1 }} />
       </Grid>
                    </Grid>
                    <br /><br />
                    <CardActions>
                        <Button variant="contained" color="success" type='submit' sx={{ width: "100%", }} >
                            Add Event
                        </Button>
                    </CardActions>
                </form>
            </Card>

   <Typography sx={{textAlign:"center"}}>Event section</Typography>

            <Grid container spacing={2}>
      {event.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
           <ShowEvents card={card} handleDelete={handleDelete}/>
        </Grid>
      ))}
    </Grid>

        </Box>
    );
};

export default Event;