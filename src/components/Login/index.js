import React, { useState } from 'react';

function Login({ setToken,navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Save token to local storage
        localStorage.setItem('userToken', data.refreshToken);
        // Storing user data in local storage after successful login
        localStorage.setItem('user', JSON.stringify(data.user));

        // Set token in parent component
        setToken(data.refreshToken);
        // Display success message
        navigate("/");
        setSuccess('Successfully logged in');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Internal Server Error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
