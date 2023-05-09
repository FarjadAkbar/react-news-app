/** @format */

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Nav } from "react-bootstrap";
import Cookies from "js-cookie";
import { AuthContext } from "../../AuthContext";
import { useLogin } from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const { loginSet } = useContext(AuthContext);
  const { mutate, isLoading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      setEmailError("Email is required");
      setEmailValid(true);
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      setEmailValid(true);
    } else {
      setEmailError("");
      setEmailValid(false);
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      setPasswordValid(true);
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      setPasswordValid(true);
    } else {
      setPasswordError("");
      setPasswordValid(false);
    }
  };

  const handleValidation = () => {
    validateEmail();
    validatePassword();
    if (emailError || passwordError) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (handleValidation()) {
      mutate(
        { email: email, password: password, remember: remember },
        {
          onSuccess: (response: { data: { user: any; token: any } }) => {
            const { user, token } = response.data;
            if (remember) {
              Cookies.set("users", JSON.stringify(user), { expires: 365 });
              Cookies.set("token", token, { expires: 365 });
            } else {
              Cookies.set("users", JSON.stringify(user), { expires: 1 });
              Cookies.set("token", token, { expires: 1 });
            }

            loginSet();
            
            setEmail("");
            setPassword("");

            navigate("/");
          },
        }
      );
    }
  };

  return (
    <Container className="p-5 my-5">
      <Row className="align-items-center">
        <Col col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </Col>

        <Col col="4" md="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={validateEmail}
                isInvalid={emailValid}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={validatePassword}
                isInvalid={passwordValid}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between mx-3 mb-4">
              <Form.Check
                type="checkbox"
                label="Remember me"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              {/* <a href="!#">Forgot password?</a> */}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="mb-4 w-100"
              disabled={isLoading}
            >
              {isLoading ? "processing..." : "Sign In"}
            </Button>

            <div className="text-center">
              <p className="d-flex gap-10 justify-content-center">
                Not a member?{" "}
                <Nav.Link as={Link} to="/signup" className="text-primary mx-2">
                  Register
                </Nav.Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
