// Imports Start ///////////////////////////////////////////
import React, { useState, useEffect } from "react";
import {Route, Routes} from 'react-router-dom';
import Home from "./components/Home"
import Alldata from "./components/AllData/index";
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/NavBar/index";
import Withdraw from "./components/Withdraw";
import Deposit from "./components/Deposit";
// Imports end /////////////////////////////////////////////


// Function Component
function App() {

  // State variables
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  
  const [totalState, setTotalState] = useState(() => {
    const storedTotalState = localStorage.getItem("totalState");
    return storedTotalState ? parseInt(storedTotalState) : 0;
  });
  ////////////////////////////////////////////////////////////////////////////////

useEffect(() => {
  localStorage.setItem("users", JSON.stringify(users));
}, [users]);


useEffect(() => {
  localStorage.setItem("totalState", totalState.toString());
}, [totalState]);

// returns all components being imported
  return (
    <div className="main-app-div">

    {/* Navbar outside route, it will stay consistant on all pages */}
    <Navbar/>


    {/* Main Routes, all routes between each component*/}
    <Routes>
    <Route path ="/" element={<Home users={users}/>}/>
    <Route path ="/create-account" element={<CreateAccount users={users} setUsers={setUsers} />}/>
    <Route path ="/withdraw" element={<Withdraw totalState={totalState} setTotalState={setTotalState}/>}/>
    <Route path ="/deposit" element={<Deposit totalState={totalState} setTotalState={setTotalState}/>}/>   
    <Route path ="/all-data" element={<Alldata users={users} setUsers={setUsers} />}/>
    </Routes>
   {/* Routes end */}


    {/* Main Div End */}
    </div>
  );
}


// Exports the main app component to index.js
export default App;