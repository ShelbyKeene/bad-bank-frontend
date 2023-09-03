import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import IMG from "../Photos/Streets.jpeg";
const Deposit = ({ totalState, setTotalState }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [transactionState, setTransactionState] = useState(0);
  const [status, setStatus] = useState(`Account Balance $ ${totalState}`);

  //handles transaction in the input field
  const handleChange = (event) => {
    setTransactionState(Number(event.target.value));
  };

  // Closes alert window
  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowAlertError(false);
    setTransactionState(0);
  };

  //Updates total amount of transactions
  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = parseFloat(transactionState);
    if (amount === 0 || isNaN(amount)) {
      setShowAlertError(true);
      return;
    }
    if (transactionState === 0) {
      setShowAlertError(true);
      return;
    }

    setTotalState(totalState + transactionState);
    setShowSuccessAlert(true);
    setTransactionState(0);
  };

  useEffect(() => {
    setStatus(totalState);
  }, [totalState, setTotalState]);

  const isSubmitDisabled = transactionState <= 0;

  return (
    <form onSubmit={handleSubmit}>
      {/* Card */}
      <div style={{ position: "relative", height: "100vh" }}>
        {/* Error Message  */}

        <Image
          src={IMG}
          fluid
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />

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

        {/* Card */}
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
              <strong>Deposit</strong>
            </h4>

            {/* Input */}
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Dollar amount (with dot and two decimal places)"
                value={transactionState}
                onChange={handleChange}
              />
            </InputGroup>
            <Button variant="light" type="submit" disabled={isSubmitDisabled}>
              Deposit
            </Button>
          </Card.Body>
        </Card>
      </div>

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
  );
};

export default Deposit;