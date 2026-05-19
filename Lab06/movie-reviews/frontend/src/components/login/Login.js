import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import users from "../../mock-data/users";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onChangeUsername = e => {
    const username = e.target.value;
    setUsername(username);
  }
  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  }
  const login = () => {
    const matchedUser = users.find(
      (u) => (u.email === username || u.username === username) && u.password === password
    );

    if (!matchedUser) {
      alert("Sai thông tin!");
      return;
    }

    props.login(matchedUser);
    navigate("/");
  }
  return (
    <div className="login">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={onChangeUsername} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={onChangePassword} />
        </Form.Group>
        <Button variant="primary" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login;