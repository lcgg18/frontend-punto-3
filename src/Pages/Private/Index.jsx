import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import Mario from "../../Assets/mario.png";


const Index = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.setToken(null);
    auth.setUser(null);
    navigate("/", {
      replace: true,
    });
  };
 
  return (
    <Box sx={{ width: 350, padding: "10px 20px" }}>
      <Grid container spacing={2}>
      <Grid item xs={12} pb={2}>
          <Typography variant="h3">Hola</Typography>
          <Typography variant="h4">{auth.user.name}</Typography>

          
        </Grid>
        <Grid item xs={12} pb={3}>
          <img src={Mario} alt="mario" width="250px"/>

        </Grid>
        <Grid item xs={12} pb={2}>

        <Button
          onClick={handleLogout}
          color="secondary"
          className="circular-btn"
          size="large"
          fullWidth
        >
          Salir
        </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
