"use client";

import config from '@/app/config';
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/navigation';
// import { BsCheckCircleFill } from "react-icons/bs";
import Link from 'next/link';
import styles from './page.scss';
import { registerUser } from '@/app/api/register';

const LoginPage = () => {
    // let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

    const [authTokens, setAuthTokens] = useState(() => {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
      } else {
        return null; // Handle the case where localStorage is not available
      }
    });
  
    // let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const router = useRouter();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    
    let loginUser = async (e) => {
      e.preventDefault();
    
      try {
        let response = await fetch(`${config.apiUrl}api/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value }),
        });
    
        if (response.status === 200) {
          console.log(response)
          let data = await response.json();
          setAuthTokens(data);
          localStorage.setItem('authTokens', JSON.stringify(data));
          // Redirect the user to the home page
          window.location.href = '/';
        } else {
          // Handle other response statuses (e.g., incorrect credentials)
          setErrorMessage("Wrong email or password");
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    };
    




    return (
   




<div className="bodycont">
  
      <div className="cont">
      <form onSubmit={loginUser} >
        <div className="form sign-in">
          <h2>Welcome back,</h2>
          <label>
            <span>Email</span>
            <input type="text" name="email"  />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password"  />
          </label>
          <Link href={'/forgotpassword'}>
          <p className="forgot-pass">Forgot password?</p></Link>
          <button  className="submit">
            Sign In
          </button>
          {errorMessage && <div className="error-message" style={{ color: "red", fontSize: "14px", marginTop: "8px", width: "100%", textAlign:"center"}}>{errorMessage}</div>}

          <Link href={"/register"}>
          <button type="button" className="mobile-sign-in-button">
      Sign Up
    </button>
    </Link>
        </div>
        </form>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              
              
            <h2>New here?</h2>
              <p>Sign up and discover a great amount of new opportunities!</p>
            </div>
            <div className="img__text m--in">
              <h2>One of us?</h2>
              <p>If you already have an account, just sign in. We've missed you!</p>
            </div>
            
            
            <Link href={"/register"}>
            
            <div className="img__btn">
              <span className="m--up"> Sign Up</span>
             
            </div>
            </Link>
           
          </div>
         
        </div>
      </div>
      </div>
     

  );
};



export default LoginPage

