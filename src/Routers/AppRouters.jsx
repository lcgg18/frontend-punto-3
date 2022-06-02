import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateLayout from "../Layouts/PrivateLayout";
import Index from "../Pages/Private/Index";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import Page404 from "../Pages/Page404";
import PrivateRoute from "./PrivateRoute";

const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<PrivateLayout />}>
          <Route
            path=""
            element={
              <PrivateRoute>
                <Index />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouters;
