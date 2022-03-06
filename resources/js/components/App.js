import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import PrivateRoute from "./routing/PrivateRoute";

import Header from "./layouts/nav/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProducts from "./pages/AddProducts";
import ListProduct from "./pages/ListProduct";
import UpdateProducts from "./pages/UpdateProducts";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Fragment>
                    <Header />
                    <Routes>
                        <Route path="/" element={<PrivateRoute />}>
                            <Route
                                path="addproducts"
                                element={<AddProducts />}
                            />
                            <Route
                                path="updateproducts/:id"
                                element={<UpdateProducts />}
                            />
                            <Route
                                path="/listProducts"
                                element={<ListProduct />}
                            />
                            <Route path="" element={<ListProduct />} />
                        </Route>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/*"
                            element={
                                <main style={{ padding: "1rem" }}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </div>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
