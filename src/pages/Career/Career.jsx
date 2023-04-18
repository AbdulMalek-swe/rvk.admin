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
// import ShowEvents from './ShowEvents';
import { Typography } from '@material-tailwind/react';
import CareerShow from './CareerShow';
 
const Event = () => {
    const { register, handleSubmit } = useForm()
    const formData = new FormData()
    const handleImage = e => {
        formData.append("cv", e.target.files[0]);
    }
    const onSubmit = data => {
        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("phone", data.phone)
        formData.append("qualification", data.qualification)
        formData.append("oppotunities", data.oppotunities)
        formData.append("address", data.address)
        
        axios.post("/api/careers/", formData)
            .then(res => {
                console.log(res);
                toast.success("successfully added event")
            })
            .catch(error=>{
                toast.error("can not add event")
            })
    }
    const [career,setCareer]= useState([]);
    useEffect(()=>{
        axios.get("/api/careers/")
        .then(res=>{
            console.log(res.data);
            setCareer(res.data)
        })
        .catch(error=>{
            toast.error("can not fetch event")
        })
    },[])
    const handleDelete = e =>{
        axios.delete(`/api/careers/${e}/`).then(res=>{
          const filter = career.filter(item=>item.id!=e)
          setCareer(filter)
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
                 <TextField id="outlined-basic" label="name" variant="outlined" {...register("name")} required type='text' sx={{ width: "100%",m:1 }} />
                
                    <TextField id="outlined-basic" label="email" variant="outlined" {...register("email")} required type='number' sx={{ width: "100%", m:1}} />
                     
                    <TextField id="outlined-basic" label="phone" variant="outlined" {...register("phone")} required type='text' sx={{ width: "100%", m:1 }} />
                    
                    <TextField id="outlined-basic" variant="outlined" onChange={handleImage} required type='file' sx={{ width: "100%", m:1 }} />
                   
                 </Grid>
                 <Grid item xs={12} sm={6}>
                 
                
                   
                    <TextField id="outlined-basic" label="oppotunities" variant="outlined" {...register("oppotunities")} required type='text' sx={{ width: "100%", m:1}} />

                    <TextField id="outlined-basic" label="address" variant="outlined" {...register("address")} required type='number' sx={{ width: "100%", m:1}} />
                    <TextField id="outlined-basic" label="qualification" variant="outlined" {...register("qualification")} required type='number' sx={{ width: "100%", m:1}} />
                   
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

   <Typography sx={{textAlign:"center"}}>Career section</Typography>

            <Grid container spacing={2}>
      {career.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
           <CareerShow  card={card}  handleDelete={handleDelete}/>
        </Grid>
      ))}
    </Grid>

        </Box>
    );
};

export default Event;