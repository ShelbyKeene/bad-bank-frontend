import React, { useState } from 'react';

function CheckBalance() {
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState(null); // State for storing the balance

  const handleCheckBalance = async () => {
    try {
      const response = await fetch(`http://localhost:3000/account/findOne/${email}`);
      if (response.ok) {
        const userData = await response.json();
        setBalance(userData.balance); // Assuming your user data contains a "balance" field
      } else {
        setBalance(null); // Reset balance if there's an error
        console.error('Error fetching balance:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={handleCheckBalance}>Check Balance</button>
      </div>
      {balance !== null && (
        <div>
          <p>Your balance is: ${balance}</p>
        </div>
      )}
    </div>
  );
}

export default CheckBalance;
