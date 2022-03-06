import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute(props) {
    const auth = () => {
        if (!localStorage.getItem("user-info")) {
            navigate("/login");
        }
    }; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
