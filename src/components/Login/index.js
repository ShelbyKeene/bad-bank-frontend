import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Login() {
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
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedInUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

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

