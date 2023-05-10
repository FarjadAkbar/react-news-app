/** @format */
import { useState } from "react";
import { Form, Button, Container, Row, Card, Col, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignUp } from "../../api";

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useSignUp();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (event: { target: { name: any } }) => {
    const { name } = event.target;
    validateField(name);
  };

  const validateField = (name: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!values.name) {
          error = "Name is required";
        }
        break;
      case "email":
        if (!values.email) {
          error = "Email is required";
        } else {
          const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          if (!emailRegex.test(values.email)) {
            error = "Invalid email address";
          }
        }
        break;
      case "password":
        if (!values.password) {
          error = "Password is required";
        } else if (values.password.length < 8) {
          error = "Password must be at least 8 characters long";
        }
        break;
      case "passwordConfirm":
        if (!values.passwordConfirm) {
          error = "Confirm Password is required";
        } else if (values.password !== values.passwordConfirm) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleValidation = () => {
    const { name, email, password, passwordConfirm } = values;
    validateField("name");
    validateField("email");
    validateField("password");
    validateField("passwordConfirm");
    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.passwordConfirm
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (handleValidation()) {
      mutate(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirm,
        },
        {
          onSuccess: () => {
            setValues({
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
            });
            toast.success("Sign up successful!");
            navigate("/login");
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.passwordConfirm}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirm}
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
