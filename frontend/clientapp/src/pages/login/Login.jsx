import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ValidateToken } from '../../util/requests/Auth';
import { LoginRequest } from "../../util/requests/Auth";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => { // Envia el formulario de login, carga el token en almacenamiento
    e.preventDefault(); // Previene el comportamiento por defecto, en caso de un form, refrescar la pagina
    const data = new FormData(e.currentTarget);
    try {
      const login_response = await LoginRequest(data.get("username"), data.get("password"), data.get("totp"))
      if (login_response != null) {
        navigate(-1);
      }
    } catch (error) {
      console.error(`${error}`);
    }
  };

  useEffect(() => { // Se verifica si se esta logueado actualmente y se redirige al panel de administracion
    const fetchTokenValid = async () => {
      try {
        const isValid = await ValidateToken();
        if (isValid) {
          navigate(-1);
        }
      } catch (error) {
      }
      
      
    }

    fetchTokenValid();
  }, [])

  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '80%'
        }}
      >
        <Avatar sx={{ m: 1, mb: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon sx={{fontSize: '1.5rem'}} />
        </Avatar>
        <Typography variant="h1">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            sx={{bgcolor:"input.light"}}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{bgcolor:"input.light"}}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="totp"
            label="OTP Key"
            type="password"
            id="totpKey"
            sx={{bgcolor:"input.light"}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

        </Box>
      </Box>
    </>
  )
}

export default Login;