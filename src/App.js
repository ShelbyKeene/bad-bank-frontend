// Imports Start ///////////////////////////////////////////
import React, { useState, useEffect,useCallback } from "react";
import {Route, Routes} from 'react-router-dom';
import Home from "./components/Home"
import Alldata from "./components/AllData/index";
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/NavBar/index";
import Withdraw from "./components/Withdraw";
import Deposit from "./components/Deposit";
import Login from "./components/Login/index";
import { useNavigate } from "react-router-dom";
// Imports end /////////////////////////////////////////////


// Function Component
function App() {
  const [users, setUsers] = useState("");   
  const [token, setToken] = useState("");   
  const [name, setUsername] = useState(""); 
  const navigate = useNavigate();
  
  
  const handleLogout = () => {
    setToken(""); // Clear the token
    setUsers(""); // Clear user data
    navigate("/");
    window.localStorage.removeItem("userToken"); // Remove token from local storage
  };




const getMe = useCallback(async () => {
  const storedToken = window.localStorage.getItem('userToken');
  
  if (!token) {
    if (storedToken) {
      setToken(storedToken);
    }
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/account/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setUsers(response.data);
      const data = await response.json();
      setUsername(data.name);; // Handle the user data from the response
    } else {
      console.log("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}, [token]);

useEffect(() => {
  getMe();
}, [getMe]); // Add getMe to the dependency 



return (
     <div className="main-app-div">

    {/* Navbar outside route, it will stay consistent on all pages */}
    <Navbar handleLogout={handleLogout} token={token} name={name}/>

    {/* Main Routes, all routes between each component*/}
    <Routes>
      {/* Always show the Home route */}
      <Route path="/" element={<Home />} />

      {/* Only show the Create Account and Login routes when logged out */}
      {!token && (
        <>
          <Route path="/login" element={<Login token={token} navigate={navigate} setToken={setToken} />} />
          <Route path="/create-account" element={<CreateAccount setToken={setToken} navigate={navigate} users={users} />} />
        </>
      )}

      {/* Show these routes when the user is logged in */}
      {token && (
        <>
          <Route path="/withdraw" element={<Withdraw token={token} />} />
          <Route path="/deposit" element={<Deposit token={token} />} />
          <Route path="/all-data" element={<Alldata token={token} users={users}/>} />
        </>
      )}
    </Routes>
    {/* Routes end */}

    {/* Main Div End */}
  </div>
  );
}


// Exports the main app component to index.js
export default App;