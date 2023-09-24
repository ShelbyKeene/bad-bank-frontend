import React from "react";


function Login({
  handleLogout,
  loggedInUser,
  handleLogin,
  handleGoogleLogin,
  password,
  setPassword,
  email,
  setEmail,
}) {
  return (
    <div>
      {loggedInUser ? (
        <div>
          <p>
          <p>Welcome, {loggedInUser.displayName}</p>
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please login</p>
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
