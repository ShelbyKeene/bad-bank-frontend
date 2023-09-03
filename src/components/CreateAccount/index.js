// Import starts////////////////////////////
import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from "uuid";
import IMG from "../Photos/Lobby.jpeg";
import Image from "react-bootstrap/Image";

// Imports End////////////////////////////////

//Functional component / destructoring users data from APP component////////////////////////
function CreateAccount({ users, setUsers }) {
  // State variables //////////////////////////////////
  const [errorPasswordMatch, setErrorPasswordMatch] = useState(false);
  const [errorUsertoUpperCase, setErrorUserToUpperCase] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPasswordToUpperCase, setErrorPasswordToUpperCase] =
    useState(false);
  const [errorPasswordLength, setErrorPasswordLength] = useState(false);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableButton] = useState(false); // State variable to disable the button
  ////////////////////////////////////////////////////////////////

  //Closes alert messages
  const handleCloseAlert = () => {
    setErrorPasswordMatch(false);
    setErrorUserToUpperCase(false);
    setErrorEmail(false);
    setErrorPasswordToUpperCase(false);
    setErrorPasswordLength(false);
  };

  // validation functions
  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  //handles creating a new user
  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (!validate(confirmPassword, "password")) return;
    /////////////////////////////////////////////////////////

    // checks if both password and confirm password are exactly the same
    if (password !== confirmPassword) {
      setErrorPasswordMatch(true);
      return null;
    }
    // alerts a user if the name does not contain an UpperCase character
    if (name.search(/[A-Z]/) === -1) {
      setErrorUserToUpperCase(true);
      return null;
    }

    // checks if the email contains the @ character
    if (email.search("@") === -1) {
      setErrorEmail(true);
      return null;
    }
    // checks if the email contains the .com character
    if (email.search(".com") === -1) {
      setErrorEmail(true);
      return null;
    }

    // checks if the password has an Uppercase character
    if (password.search(/[A-Z]/) === -1) {
      setErrorPasswordToUpperCase(true);
      return null;
    }
    // checks if the password has 8 characters
    if (password.length < 8) {
      setErrorPasswordLength(true);
      return null;
    }
    const newUser = { id: uuidv4(), name, email, password, confirmPassword };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setShow(false);
    setErrorPasswordMatch(false);
    setErrorUserToUpperCase(false);
  }

  // clears the form fields
  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShow(true);
  }

  // Check if any input field is empty
  const isAnyFieldEmpty = !name || !email || !password || !confirmPassword;

  return (
    <div status={status} style={{ position: "relative", height: "100vh" }}>
      <Image
        src={IMG}
        fluid
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />

      {show ? (
        <>
          <Card
            style={{
              width: "55%",
              height: "50%",
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed (0.5 = 50% opacity)
            }}
            className=" text-white"
          >
            <h1 style={{ textAlign: "center" }}>Create Account</h1>
            <Card.Body>
              Name
              <br />
              <input
                type="input"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <br />
              Email address
              <br />
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <br />
              Password
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <br />
              Confirm Password
              <br />
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
              <br />
              <Button
                variant="dark"
                type="submit"
                onClick={handleCreate}
                disabled={isAnyFieldEmpty || disableButton} // Disable the button if any field is empty or disableButton is true
              >
                Create Account
              </Button>
            </Card.Body>
          </Card>
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            width: "50%",
            height: "70%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert style={{ height: "100px" }} variant={"success"}>
            Account Created!
          </Alert>
          <Button
            type="submit"
            className="btn btn-light"
            onClick={clearForm}
            variant="light"
          >
            Add another account
          </Button>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorPasswordMatch && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert variant="danger">
            <Alert.Heading>Password does not match</Alert.Heading>
            <div className="d-flex justify-content-end">
              <Button onClick={handleCloseAlert} variant="outline-success">
                Close me y'all!
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorUsertoUpperCase && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert variant="danger">
            <Alert.Heading>Name needs an uppercase</Alert.Heading>
            <div className="d-flex justify-content-end">
              <Button onClick={handleCloseAlert} variant="outline-success">
                Close me y'all!
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorEmail && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert variant="danger">
            <Alert.Heading>Please enter a valide email address</Alert.Heading>
            <div className="d-flex justify-content-end">
              <Button onClick={handleCloseAlert} variant="outline-success">
                Close me y'all!
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorPasswordToUpperCase && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert variant="danger">
            <Alert.Heading>Password needs a uppercase</Alert.Heading>
            <div className="d-flex justify-content-end">
              <Button onClick={handleCloseAlert} variant="outline-success">
                Close me y'all!
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorPasswordLength && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert variant="danger">
            <Alert.Heading>Please enter at least 8 characters</Alert.Heading>
            <div className="d-flex justify-content-end">
              <Button onClick={handleCloseAlert} variant="outline-success">
                Close me y'all!
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;