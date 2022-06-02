import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";

const base_url = process.env.REACT_APP_RUTA_SERVER;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleRegister = async () => {
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
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box sx={{ width: 350, padding: "10px 20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} pb={2}>
          <Typography variant="h6">Crear Cuenta</Typography>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            type="text"
            variant="filled"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Correo"
            type="email"
            variant="filled"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            type="password"
            variant="filled"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            fullWidth
            onClick={handleRegister}
          >
            Registrarme
          </Button>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <Link to="/">Ya tengo cuenta</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
