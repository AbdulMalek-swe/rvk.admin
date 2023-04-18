import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const Login = () => {
  const { login } = useContext(AuthContext)
  const { register, handleSubmit, } = useForm();
  const navigate = useNavigate()
  const onSubmit = async data => {
    const res = await login(data)
    console.log(res);
    if (res?.status === 200 || res?.status === 201) {
      navigate("/dashboard/home")
    }
  }
  return (
    <Box align="center" sx={{marginTop:"200px"}}>
<Card sx={{ maxWidth: 375,padding:"12px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="outlined-basic" label="email" variant="outlined" {...register("email")} required type='email' sx={{width:"100%", }} />
        <br/><br/>
        <TextField id="outlined-basic" label="password" variant="outlined" {...register("password")} required type='password' sx={{width:"100%", }} />
        <CardActions>
          <Button variant="contained" color="success" type='submit' sx={{width:"100%", }} >
            Login
          </Button>
        </CardActions>
      </form>
    </Card>
    </Box>
    


  );
};

export default Login;