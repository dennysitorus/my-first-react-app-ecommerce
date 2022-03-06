import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/addproducts");
    }
  }, []);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function login(event) {
    event.preventDefault();
    let item = { email, password };
    // console.warn(item);

    let result = await fetch("http://ecom-backend.me/api/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    result = await result.json();
    if (result.status) {
      const userDB = result.user;
      const user = {};
      user.name = userDB.NAME;
      user.email = userDB.EMAIL;
      user.id = userDB.ID;

      localStorage.setItem("user-info", JSON.stringify(user));
      navigate("/");
    } else {
      alert(result.message);
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h1>Halaman Login</h1>
        <Form onSubmit={login}>
          <Form.Group className="mb-3" controlId="loginMail">
            <Form.Label className="">Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
