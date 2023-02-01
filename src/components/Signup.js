import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { getAuth, sendEmailVerification } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp, user } = useUserAuth();

  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signUp(email, password);
      if (res) {
        // const checkVerified = await res.user.sendEmailVerification();
        sendEmailVerification(auth.currentUser)
          .then((data) => {
            auth.currentUser.reload();
            console.log("after verification data", auth);
          })
          .catch((err) => console.log(err));
        console.log("Res__>> ", res.user);
      }
      // console.log("check: ",check);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {true && (
        <div className="p-4 box">
          <h2 className="mb-3">Firebase Auth Signup</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      )}
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
