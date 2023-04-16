import React from 'react';
import { useForm } from 'react-hook-form';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from '../../api/apiService';
import Grid from '@mui/material/Grid';


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
                    <TextField id="outlined-basic" label="location" variant="outlined" {...register("location")} required type='text' sx={{ width: "100%",m:1 }} />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                 
                
                    <TextField id="outlined-basic" variant="outlined" {...register("start")} required type='date' sx={{ width: "100%",m:1 }} />
                    <TextField id="outlined-basic" label="capacity" variant="outlined" {...register("cap")} required type='number' sx={{ width: "100%", m:1}} />
                    <TextField id="outlined-basic" label="description" variant="outlined" multiline
                        rows={4}
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
        </Box>
    );
};

export default Event;