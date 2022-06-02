import { useState } from "react";
import { Box, Grid, Typography, TextField, Button, Chip } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import { isEmail } from "../../Util/validation";
import { ErrorOutline } from "@mui/icons-material";

const base_url = process.env.REACT_APP_RUTA_SERVER;

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showError, setShowError] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setShowError(false);
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
    })
      .then(({ status, data }) => {
        if (status === 200) {
          navigate("/app", {
            replace: true,
          });
          auth.setToken(data.token);
          auth.setUser({ uid: data.uid, name: data.name });
        }
      })
      .catch(() => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      });
  };

  return (
    <>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} pb={2}>
              <Typography variant="h6">Iniciar Sesión</Typography>
              <Chip
                label="No se reconoce el correo o la contraseña"
                color="error"
                variant="outlined"
                icon={<ErrorOutline />}
                sx={{ display: showError ? "block" : "none" }}
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
                  validate: isEmail,
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
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
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
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <Link to="/register">¿No tienes cuenta?</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Login;
