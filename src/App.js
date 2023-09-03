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
// Imports end /////////////////////////////////////////////


// Function Component
function App() {
  
  const [token, setToken] = useState("");   
//   // State variables
//   const [users, setUsers] = useState(() => {
//     const storedUsers = localStorage.getItem("users");
//     return storedUsers ? JSON.parse(storedUsers) : [];
//   });

  
//   const [totalState, setTotalState] = useState(() => {
//     const storedTotalState = localStorage.getItem("totalState");
//     return storedTotalState ? parseInt(storedTotalState) : 0;
//   });
//   ////////////////////////////////////////////////////////////////////////////////

// useEffect(() => {
//   localStorage.setItem("users", JSON.stringify(users));
// }, [users]);


// useEffect(() => {
//   localStorage.setItem("totalState", totalState.toString());
// }, [totalState]);








// returns all components being imported
 

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
      const data = await response.json();
      console.log(data); // Handle the user data from the response
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

    {/* Navbar outside route, it will stay consistant on all pages */}
    <Navbar/>


    {/* Main Routes, all routes between each component*/}
    <Routes>
    <Route path ="/" element={<Home />}/>
    <Route path ="/login" element={<Login   />}/>
    <Route path ="/create-account" element={<CreateAccount   />}/>
    <Route path ="/withdraw" element={<Withdraw  />}/>
    <Route path ="/deposit" element={<Deposit />}/>   
    <Route path ="/all-data" element={<Alldata  />}/>
    </Routes>
   {/* Routes end */}


    {/* Main Div End */}
    </div>
  );
}


// Exports the main app component to index.js
export default App;