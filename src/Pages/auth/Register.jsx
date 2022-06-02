import { useState } from "react";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Grid, Typography, TextField, Button, Chip } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { isEmail } from "../../Util/validation";

const base_url = process.env.REACT_APP_RUTA_SERVER;

const Register = () => {
 
  const {register, handleSubmit,formState: { errors }} = useForm();
  const [showError, setShowError] = useState(false);
 

  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async ({name,email,password}) => {
    setShowError(false);
    await axios({
      method: "POST",
      url: `${base_url}auth/new`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        email,
        password,
      },
    })
      .then(({ status }) => {
        if (status === 201) {
          navigate("/", {
            replace: true,
          });
          auth.setToken(null);
          auth.setUser(null);
        }
      })
      .catch(() => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      });
  };
  return (
    <Box sx={{ width: 350, padding: "10px 20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} pb={2}>
          <Typography variant="h6">Crear Cuenta</Typography>
          <Chip 
          label="Error al registrarte"
          color="error"
          variant="outlined"
          icon={<ErrorOutline />}
          sx={{ display: showError ? "block" : "none" }}
          
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            type="text"
            variant="filled"
            fullWidth
            {...register("name", {
              required: "Este campo es requerido",
               minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" } 
           })}
           error={!!errors.name}
           helperText={errors.name && errors.name.message}
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Correo"
            type="email"
            variant="filled"
            fullWidth
            {...register("email", { 
              required: "Este campo es requerido",
              validate: isEmail 
            })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            type="password"
            variant="filled"
            fullWidth
            {...register("password", {
              required: "Este campo es requerido",
               minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" } 
           })}
           error={!!errors.password}
           helperText={errors.password && errors.password.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
            fullWidth
          >
            Registrarme
          </Button>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <Link to="/">Ya tengo cuenta</Link>
        </Grid>
      </Grid>
      </form>
    </Box>
  );
};

export default Register;
