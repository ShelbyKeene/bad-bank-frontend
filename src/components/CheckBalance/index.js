import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import IMG from '../Photos/Streets.jpeg';
import { useAuth } from '../AuthContext'; // Import the useAuth hook

function CheckBalance() {
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState(null);
  const { accessToken } = useAuth(); // Get the access token using the useAuth hook

  const handleCheckBalance = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/account/findOne/${email}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setBalance(userData.balance);
      } else {
        setBalance(null);
        console.error('Error fetching balance:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Image
        src={IMG}
        fluid
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      <Card
        style={{
          width: '35%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        className="text-white"
      >
        <Card.Body>
          <Card.Title>Check Balance</Card.Title>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="dark" onClick={handleCheckBalance}>
            Check Balance
          </Button>
          {balance !== null && (
            <div className="mt-3">
              <p>Your balance is: ${balance}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CheckBalance;
