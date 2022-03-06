import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
    const user = JSON.parse(localStorage.getItem("user-info"));
    const navigate = useNavigate();
    const isUserExist = localStorage.getItem("user-info");

    function logOut() {
        localStorage.clear();
        navigate("login");
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
                <Nav className="me-auto">
                    {
                        /* menggunakan kondisi, apabila sudah pernah login maka hanya menampilkan Add dan Update Products */

                        isUserExist ? (
                            <div
                                class="collapse navbar-collapse"
                                id="navbarNav"
                            >
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <Link
                                            to="/addproducts"
                                            className="nav-link"
                                        >
                                            Add Products
                                        </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link
                                            to="/listProducts"
                                            className="nav-link"
                                        >
                                            List Products
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div
                                class="collapse navbar-collapse"
                                id="navbarNav"
                            >
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <Link to="/login" className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link
                                            to="/register"
                                            className="nav-link"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </Nav>
                {isUserExist ? (
                    <Nav>
                        <NavDropdown title={user != null ? user.name : "User"}>
                            <NavDropdown.ItemText onClick={logOut}>
                                Logout
                            </NavDropdown.ItemText>
                        </NavDropdown>
                    </Nav>
                ) : null}
            </Container>
        </Navbar>
    );
}

export default Header;
