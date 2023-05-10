/** @format */

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Nav } from "react-bootstrap";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../AuthContext";
import { useLogin } from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const { loginSet } = useContext(AuthContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { mutate, isLoading } = useLogin();

  const [emailState, setEmailState] = useState({
    email: "",
    emailError: "",
    emailValid: false
  });

  const [passwordState, setPasswordState] = useState({
    password: "",
    passwordError: "",
    passwordValid: false
  });

  const [remember, setRemember] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email } = emailState;
    if (!email) {
      setEmailState({
        email: email,
        emailError: "Email is required",
        emailValid: true
      });
    } else if (!emailRegex.test(email)) {
      setEmailState({
        email: email,
        emailError: "Invalid email address",
        emailValid: true
      });
    } else {
      setEmailState({
        email: email,
        emailError: "",
        emailValid: false
      });
    }
  };

  const validatePassword = () => {
    const { password } = passwordState;
    if (!password) {
      setPasswordState({
        password: password,
        passwordError: "Password is required",
        passwordValid: true
      });
    } else if (password.length < 8) {
      setPasswordState({
        password: password,
        passwordError: "Password must be at least 8 characters long",
        passwordValid: true
      });
    } else {
      setPasswordState({
        password: password,
        passwordError: "",
        passwordValid: false
      });
    }
  };

  const handleValidation = () => {
    validateEmail();
    validatePassword();
    if (emailState.emailError || passwordState.passwordError) {
      return false;
    }
    return true;
  };

const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();

  const email = emailState.email;
  const password = passwordState.password;

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
          
          setEmailState({ email: "", emailError: "", emailValid: false });
          setPasswordState({ password: "", passwordError: "", passwordValid: false });

          toast.success("Login successful!");
          navigate("/");
        },
        onError: () => {
          toast.error("Something went wrong!");
        }
      }
    );
  }
};

  return (
    <Container className="p-5 my-5">
    <ToastContainer />
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
                  value={emailState.email}
                  onChange={(e) => {
                    setEmailState({
                      ...emailState,
                      email: e.target.value
                    });
                  }}
                  onBlur={validateEmail}
                  isInvalid={emailState.emailValid}
                />

              <Form.Control.Feedback type="invalid">
                {emailState.emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwordState.password}
                onChange={(e) => {
                  setPasswordState({
                    ...passwordState,
                    password: e.target.value
                  });
                }}
                onBlur={validatePassword}
                isInvalid={passwordState.passwordValid}
              />
              <Form.Control.Feedback type="invalid">
                {passwordState.passwordError}
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
