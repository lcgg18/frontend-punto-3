import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.isLogged() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
