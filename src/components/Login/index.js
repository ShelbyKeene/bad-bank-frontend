import React,{useState} from "react";
import IMG from "../Photos/Lobby.jpeg";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAuth } from '../AuthContext' ;

function Login({
  navigate,
  handleLogout,
  loggedInUser,
  handleLogin,
  handleGoogleLogin,
  password,
  setPassword,
  email,
  setEmail,
}) {
  const { setToken } = useAuth(); // Get the setIdToken function from your context
  const [showMessage, setShowMessage] = useState(false);

  const handleLoginClick = () => {
    handleLogin()
      .then((userCredential) => {
        // After successful login, get the Firebase ID token
        return userCredential.user.getIdToken();
      })
      .then((idToken) => {
        // Set the ID token in the context
        setToken(idToken);
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail(""); // Clear the email input
    setPassword(""); // Clear the password input
  };


  const handleGoogleLoginClick = () => {
    if (!loggedInUser) {
      // User is not logged in, show the message
      setShowMessage(true);
    } 
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Button
              style={{ width: "100%" }}
              variant="dark"
              onClick={handleGoogleLoginClick}
            >
              Login with Google
            </Button>
            
            {showMessage && (
              <div>
                <p>Please ensure you have created an account before logging in with Google.</p>
                <Button
                  style={{ width: "100%" }}
                  variant="dark"
                  onClick={handleGoogleLogin}
                >
                  Proceed with Google Login
                </Button>
                <Button
                  style={{ width: "100%" }}
                  variant="dark"
                  onClick={() => {
                    navigate("/create-account");
                  }}
                >
                  Create Account
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
