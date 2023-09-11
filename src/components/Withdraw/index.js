import React, { useState } from 'react';

function Withdraw() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/account/update/${email}/-${amount}`, {
        method: 'GET',
      });

      if (response.ok) {
        // Deposit was successful
        alert('Deposit successful!');
        setEmail('');
        setAmount('');
      } else {
        // Handle error cases here
        alert('Deposit failed. Please check your input and try again.');
      }
    } catch (error) {
      console.error('Error depositing money:', error);
    }
  };

  return (
    <div>
      <h2>Withdraw Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
}

export default Withdraw;
