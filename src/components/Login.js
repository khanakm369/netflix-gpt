import React, { useRef, useState } from 'react';
import Header from './Header';
import {checkValidateData} from "../utilis/Validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import {  getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);


  const handleButtonClick = () => {
    const auth = getAuth();
  
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const message = checkValidateData(emailValue, passwordValue);
    setErrorMessage(message);
  
    if (message) return;
  
    const action = isSignInForm ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
    action(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Handle the response
        const user = userCredential.user;
        console.log('User:', user);
      })
      .catch((error) => {
        // More detailed error logging for debugging
        console.error('Authentication Error:', error);
        setErrorMessage(error.message);
      });
  };
  


  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />

      <div className="fixed inset-0 w-full h-screen">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c1366fb4-3292-4428-9639-b73f25539794/3417bf9a-0323-4480-84ee-e1cb2ff0966b/IN-en-20240408-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt="Background" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
      <h1 className="font-bold text-xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
    

        {!isSignInForm && (
          <input 
          ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 opacity-50"
          />
        )}

        <input 
          ref={email}
          type="text" 
          placeholder="Email Address" 
          className="p-4 my-4 w-full bg-gray-700 opacity-50"
        />
        <input 
          ref={password}
          type="password" 
          placeholder="Password" 
          className="p-4 my-4 w-full bg-gray-700 opacity-50"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button type="button" onClick={handleButtonClick} className="p-4 my-4 bg-red-700 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New To Netflix? Sign Up Now" : "Already a User? Sign In Now"}
        </p>
      </form>
    </div>
  );
}

export default Login;
