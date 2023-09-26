import React from "react";
import IMG from "../Photos/Lobby.jpeg";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Login({
  handleLogout,
  loggedInUser,
  handleLogin,
  handleGoogleLogin,
  password,
  setPassword,
  email,
  setEmail,
}) {
  const handleLoginClick = () => {
    handleLogin();
    setEmail(""); // Clear the email input
    setPassword(""); // Clear the password input
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Image
        src={IMG}
        fluid
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
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
        <Card.Body>
          <div>
            <h1 style={{ textAlign: "center" }}>Please login</h1>
            <br />
            <label>Email:</label>
            <br />
            <input
              style={{ width: "100%" }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              style={{ width: "100%" }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button
              style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}
              variant="dark"
              onClick={handleLoginClick} // Use the handleLoginClick function
            >
              Login
            </Button>
            <Button
              style={{ width: "100%" }}
              variant="dark"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;

