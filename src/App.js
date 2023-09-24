// Imports Start ///////////////////////////////////////////
import React, { useState, useEffect,useCallback } from "react";
import {Route, Routes} from 'react-router-dom';
import Home from "./components/Home"
// import Alldata from "./components/AllData/index";
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/NavBar/index";
import Withdraw from "./components/Withdraw";
import Deposit from "./components/Deposit";
import Login from "./components/Login/index";
import CheckBalance from "./components/CheckBalance";
import { useNavigate } from "react-router-dom";


import { initializeApp } from "firebase/app";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyBWmVGjU4SJTNC3x_WdFzdaW4i8fE9VAcM",
  authDomain: "my-first-dcf58.firebaseapp.com",
  databaseURL: "https://my-first-dcf58-default-rtdb.firebaseio.com",
  projectId: "my-first-dcf58",
  storageBucket: "my-first-dcf58.appspot.com",
  messagingSenderId: "877230109584",
  appId: "1:877230109584:web:bafb9925c51f1eb13ab915",
  measurementId: "G-S101Y2H5KH",
};

// Imports end /////////////////////////////////////////////
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function Component
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);


const navigate = useNavigate();


useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setLoggedInUser(user);
  });

  return () => unsubscribe();
}, []);



const handleLogin = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};


const handleGoogleLogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      if (user.email && user.email.includes("@")) {
        console.log("Access granted.");
        setLoggedInUser(user);
      } else {
        console.log("Access denied");
        auth.signOut();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};


const handleLogout = () => {
  auth.signOut();
};
  




 
  




return (
     <div className="main-app-div">

    {/* Navbar outside route, it will stay consistent on all pages */}
    <Navbar handleLogout={handleLogout}/>

    {/* Main Routes, all routes between each component*/}
    <Routes>
  <Route path="/" element={<Home />} />
 
 
      <Route path="/login" element={<Login navigate={navigate} password={password} setPassword={setPassword} setEmail={setEmail} email={email} loggedInUser={loggedInUser} handleGoogleLogin={handleGoogleLogin} handleLogin={handleLogin}handleLogout={handleLogout}/>} />
      <Route path="/create-account" element={<CreateAccount navigate={navigate} loggedInUser={loggedInUser} handleLogout={handleLogout} />} />
 
  
      
     

      <Route path="/withdraw" element={<Withdraw loggedInUser={loggedInUser} />} />
      <Route path="/deposit" element={<Deposit loggedInUser={loggedInUser} />} />
      <Route path="/balance" element={<CheckBalance loggedInUser={loggedInUser} />} />
    

</Routes>

    {/* Routes end */}

    {/* Main Div End */}
  </div>
  );
}


// Exports the main app component to index.js
export default App;