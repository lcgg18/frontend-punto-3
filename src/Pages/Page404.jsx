import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
    >
      <Typography variant="h1" component="h1" fontSize={60} fontWeight={200}>
        404 |
      </Typography>
      <Typography marginLeft={2}>
        No encontramos ninguna pagina aquí
      </Typography>
    </Box>
      <Link className="regresar" to='/'>Regresar al inicio</Link>
    </>
    
  );
};

export default Page404;
