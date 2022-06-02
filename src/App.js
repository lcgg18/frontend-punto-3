import "./App.css";
import AppRouters from "./Routers/AppRouters";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthProvider from "./Auth/AuthProvider";
import { lightTheme } from "./Theme/light-theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <AppRouters />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
