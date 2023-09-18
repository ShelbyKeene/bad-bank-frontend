import React, { useState, useEffect } from 'react';

function Login({handleLogout,loggedInUser,handleLogin,handleGoogleLogin,password, setPassword,email, setEmail}) {
 
  console.log(loggedInUser)





  return (
    <div>
      {loggedInUser ? (
        <div>
          <p>You are logged in using the following email: {loggedInUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in with your Okta Login</p>
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
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
}

export default Login;

