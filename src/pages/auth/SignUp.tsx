/** @format */
import { useState } from "react";
import { Form, Button, Container, Row, Card, Col, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../../api";

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);

  const validateName = () => {
    if (!name) {
      setNameError("Name is required");
      setNameValid(true);
    } else {
      setNameError("");
      setNameValid(false);
    }
  };

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

  const validatePasswordConfirm = () => {
    if (!passwordConfirm) {
      setPasswordConfirmError("Confirm Password is required");
      setPasswordConfirmValid(true);
    } else if (password !== passwordConfirm) {
      setPasswordConfirmError("Passwords are not match");
      setPasswordConfirmValid(true);
    } else {
      setPasswordConfirmError("");
      setPasswordConfirmValid(false);
    }
  };

  const handleValidation = () => {
    validateName();
    validateEmail();
    validatePassword();
    validatePasswordConfirm();

    if (nameError || emailError || passwordError || passwordConfirmError) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) {
      mutate(
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirm,
        },
        {
          onSuccess: () => {
            setName("");
            setEmail("");
            setPassword("");
            setPasswordConfirm("");

            navigate("/login");
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onBlur={validateName}
                isInvalid={nameValid}
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </Form.Group>

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

            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
                onBlur={validatePasswordConfirm}
                isInvalid={passwordConfirmValid}
              />
              <Form.Control.Feedback type="invalid">
                {passwordConfirmError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mb-4 w-100"
              disabled={isLoading}
            >
              {isLoading ? "processing..." : "Sign Up"}
            </Button>

            <div className="text-center">
              <p className="d-flex gap-10 justify-content-center">
                Already have an account?{" "}
                <Nav.Link as={Link} to="/signup" className="text-primary mx-2">
                  Sign In
                </Nav.Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
