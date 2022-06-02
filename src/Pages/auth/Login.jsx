import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";

const base_url = process.env.REACT_APP_RUTA_SERVER;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async () => {
    await axios({
      method: "POST",
      url: `${base_url}auth`,
      headers: {
        "Content-Type": "application/json",
        
      },
      data: {
        email,
        password,
      },
    }).then(({status,data}) => {
        if (status === 200) {
          navigate("/app", {
            replace: true,
          });
          auth.setToken(data.token);
          auth.setUser({ uid: data.uid, name: data.name});
        
      }}).catch((error) => {
       console.log(error);
      
  })};

  return (
    <>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} pb={2}>
            <Typography variant="h6">Iniciar Sesión</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleLogin}
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <Link to="/register">¿No tienes cuenta?</Link>
          </Grid>
        </Grid>
      </Box>
        
    </>
  );
}


export default Login;
