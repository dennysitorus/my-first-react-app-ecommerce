import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/addproducts");
    }
  }, []);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function signUp(event) {
    event.preventDefault();
    let item = { name, email, password };
    // console.warn(item);

    let result = await fetch("http://ecom-backend.me/api/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    result = await result.json();
    //console.warn(result);
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/addproducts");
  }

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h1>Halaman Register</h1>
        <Form onSubmit={signUp}>
          <Form.Group className="mb-3" controlId="registerName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter fullname"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerMail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerPassowrd">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
