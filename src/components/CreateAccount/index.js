import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CreateUser({ setToken, navigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  async function handleCreateUser() {
    setError(null);
    setStatus("Creating user...");

    try {
      const response = await fetch("https://backend-bank-850738bd4b85.herokuapp.com/account/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("User created successfully!");
        if (data.shortToken) {
          setToken(data.shortToken); // Set the shortToken here
          window.localStorage.setItem("userToken", data.shortToken);
        }
        navigate("/");
      } else {
        setStatus("Failed to create user");
        setError(data.message);
      }
    } catch (error) {
      setStatus("An error occurred");
      console.error("Error creating user:", error);
    }
  }

  return (
    <div>
      <h1>Create User</h1>
      <Card>
        <Card.Body>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleCreateUser}>Create User</Button>
        </Card.Body>
      </Card>
      {status && <Alert variant="success">{status}</Alert>}
      {error && <Alert variant="danger">Error: {error}</Alert>}
    </div>
  );
}

export default CreateUser;
