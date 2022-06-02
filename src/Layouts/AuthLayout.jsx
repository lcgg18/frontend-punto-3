import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";


const AuthLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" paddingTop={5}>
        Zona Publica
      </Typography>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          <Outlet />
        </Box>
      </main>
    </Box>
  );
};

export default AuthLayout;
