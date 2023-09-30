import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import IMG from "../Photos/Streets.jpeg";
import { useAuth } from "../AuthContext";

function Deposit({ loggedInUser }) {
  const { accessToken } = useAuth();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  // Closes alert window
  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowAlertError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (amount === 0 || isNaN(amount)) {
        setShowAlertError(true);
        return;
      }
      if (!loggedInUser) {
        alert("Error: You are not logged in.");
        return;
      }

      // Convert both emails to lowercase and then compare
      if (loggedInUser.email.toLowerCase() !== email.toLowerCase()) {
        alert("Error: You are not authorized to view this balance.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/account/update/${email}/${amount}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Deposit was successful
        setShowSuccessAlert(true);
        setEmail("");
        setAmount("");
      } else {
        // Handle error cases here
        alert("Deposit failed. Please check your input and try again.");
      }
    } catch (error) {
      console.error("Error depositing money:", error);
    }
  };
  const isSubmitDisabled = amount <= 0;

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <form onSubmit={handleSubmit}>
        {/* Card */}

        {/* Error Message  */}

        <Image
          src={IMG}
          fluid
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />

        {/* Card */}
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
            <h4 style={{ textAlign: "center" }}>
              <strong>Deposit</strong>
            </h4>
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%" }} // Make the input width 100%
            />
            <br />
            <label>Amount:</label>
            <br />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{ width: "100%" }} // Make the input width 100%
            />
            <br />
            <Button
              variant="dark"
              type="submit"
              disabled={isSubmitDisabled}
              style={{ width: "100%" }}
            >
              Deposit
            </Button>
          </Card.Body>
        </Card>

        {showSuccessAlert && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Alert variant="success">
              <Alert.Heading>Successful Deposit!</Alert.Heading>
              <div>
                <Button onClick={handleCloseAlert} variant="outline-success">
                  Close me y'all!
                </Button>
              </div>
            </Alert>
          </div>
        )}

        {/* Error Message  */}
        {showAlertError && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Alert variant="danger">
              <Alert.Heading>
                Please enter a number greater than zero
              </Alert.Heading>
              <div className="d-flex justify-content-end">
                <Button onClick={handleCloseAlert} variant="outline-success">
                  Close me y'all!
                </Button>
              </div>
            </Alert>
          </div>
        )}
      </form>
    </div>
  );
}

export default Deposit;
