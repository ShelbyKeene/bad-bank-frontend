import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import IMG from "../Photos//DepositPG.jpeg";
import Image from "react-bootstrap/Image";

const Withdraw = ({ totalState, setTotalState }) => {
  const [successAlert, setSucessAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertErrorInsufficient, setShowAlertErrorInsufficient] = useState(false);
  const [transactionState, setTransactionState] = useState(0);
  const [status, setStatus] = useState(`Account Balance $ ${totalState}`);

  //handles transaction in the input field
  const handleChange = (event) => {
    setTransactionState(Number(event.target.value));
  };

  // Closes alert messages
  const handleCloseAlert = () => {
    setSucessAlert(false);
    setShowAlertError(false);
    setShowAlertErrorInsufficient(false);
    setTransactionState(0);
  };

  // Handles the withdrawl
  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = parseFloat(transactionState);
    if (amount === 0 || isNaN(amount)) {
      setShowAlertError(true);
      setTransactionState(0);
      return;
    }

    if (transactionState === 0) {
      setShowAlertError(true);
      return;
    }
    if (totalState - transactionState < 0) {
      setShowAlertErrorInsufficient(true);
      return;
    }
    setTotalState(totalState - transactionState);
    setSucessAlert(true);
    setTransactionState(0);
  };

  useEffect(() => {
    setStatus(totalState);
  }, [totalState, setTotalState]);

  const isSubmitDisabled = transactionState <= 0;

  return (
    <div status={status} style={{ position: "relative", height: "100vh" }}>
      <Image
        src={IMG}
        fluid
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
      <form onSubmit={handleSubmit}>
        {/* Card  */}
        <Card
          style={{
            width: "55%",
            height: "25%",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed (0.5 = 50% opacity)
          }}
          className=" text-white"
        >
          <Card.Body>
            <h2>Account Balance:</h2>
            <h4>${status}</h4>
          </Card.Body>
        </Card>

        {/* Card  */}
        <Card
          style={{
            width: "55%",
            height: "25%",
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed (0.5 = 50% opacity)
          }}
          className=" text-white"
        >
          <Card.Body>
            <h4>
              <strong>Withdraw</strong>
            </h4>
            {/* Input Form */}
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Dollar amount (with dot and two decimal places)"
                value={transactionState}
                onChange={handleChange}
              />
            </InputGroup>
            <Button type="submit" disabled={isSubmitDisabled} variant="light">
              Withdrawl
            </Button>
          </Card.Body>
        </Card>

        {/* Success Alert */}
        {successAlert && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Alert variant="success">
              <Alert.Heading>Successful Withdrawl!</Alert.Heading>
              <div className="d-flex justify-content-end">
                <Button onClick={handleCloseAlert} variant="outline-success">
                  Close me y'all!
                </Button>
              </div>
            </Alert>
          </div>
        )}

        {/* Error Message */}
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

        {/* Error Message */}
        {showAlertErrorInsufficient && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Alert variant="danger">
              <Alert.Heading>Insufficient Amount</Alert.Heading>
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
};

export default Withdraw;