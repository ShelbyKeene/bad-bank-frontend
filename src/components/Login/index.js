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
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Image
        src={IMG}
        fluid
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
    <Card
          style={{
            width: "35%", // Set the card width to fit its content
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          className="text-white"
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
                    style={{ width: "100%", marginBottom: "10px",marginTop: "10px" }} // Add margin to separate the buttons
                    variant="dark"
                    onClick={handleLogin}
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
