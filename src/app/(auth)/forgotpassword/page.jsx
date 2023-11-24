"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser,verifyOTP } from '@/app/api/register';
import PrivateRoute from '@/app/privateRoute';
import styles from './page.scss';
import Link from 'next/link';
import config from "@/app/config";
const Register = () => {
  const router = useRouter();
  const [otpInputVisible, setOtpInputVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  

  console.log(otpInputVisible)
  // setOtpInputVisible(true);
  console.log(otpInputVisible)
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [resetError, setResetError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Step 1 for requesting reset, Step 2 for confirmation


  const sendResetRequest = async () => {
    setLoading(true);
    try {
      // Make an API request to your backend for password reset request
      const response = await fetch(`${config.apiUrl}api/password-reset/request/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Request successful, move to step 2 for confirmation
        setStep(2);
      } else {
        // Handle error, e.g., show a message indicating failure
        console.error('Password reset request failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const confirmPasswordReset = async () => {
   
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return; // Exit early if passwords do not match
    } else {
      setConfirmPasswordError(""); // Clear the error message when passwords match
    }
    if (!otp) {
      setOtpError("Please enter the OTP");
      return;
    }
  

    

    try {
      // Make an API request to your backend for password reset confirmation
      const response = await fetch(`${config.apiUrl}api/password-reset/confirm/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }),
      });

      if (response.ok) {
        // Password reset confirmation successful
        console.log('Password reset successful.');
        toast.success("Success");
        router.push("/login");
      } else {
        // Handle error, e.g., show a message indicating failure
        setOtpError("Invalid OTP");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };






  return (

    
<div className="bodycont">
<div className=" h-14 cursor-pointer items-center gap-2 text-primeColor text-4xl font-bold p-20">

          
<Link href={"/"}>StockBoxPro </Link>
</div>

  <div className="cont">
    <div className={`form ${step === 2 ? "m--in" : ""}`}>
      <h2>Reset Password</h2>
      {step === 1 && (
        <>
          <label htmlFor="email">
            <span>Email</span>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {/* <button className="submit" onClick={sendResetRequest}>
            Send Reset Email
          </button> */}
          <button className="submit"  onClick={sendResetRequest} disabled={loading}>
          
        {loading ? "Loading..." : "Register"}
      </button>
          
          
        </>
      )}
      {step === 2 && (
        <>
          {/* <label htmlFor="otp">
            <span>OTP</span>
            <input
              type="text"
              id="otp"
              placeholder="Enter the OTP from your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label> */}
          <label htmlFor="otp">
  <span>OTP</span>
  <input
    type="text"
    id="otp"
    placeholder="Enter the OTP from your email"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
  />
</label>
<div className="error-message" style={{ color: "red", fontSize: "14px", marginTop: "8px", width: "100%", textAlign:"center"}}>
  {otpError}
</div>

        
          <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="password-error" style={{ color: "red" }}>
                {passwordError}
              </div>
            </label>
            <label>
  <span>Confirm Password</span>
  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  {confirmPasswordError && (
    <div className="password-error" style={{ color: "red" }}>
      {confirmPasswordError}
    </div>
  )}
</label>
          <button className="submit" onClick={confirmPasswordReset}>
            Reset Password
          </button>
        </>
      )}
    </div>
    <div className={`sub-cont ${step === 2 ? "m--up" : ""}`}>
      {/* Your image and text for step 1 */}
      <div className="img">
        <div className="img__text">
          <h2>Forgot your password?</h2>
          <p>Enter your email to reset your password.</p>
        </div>
      </div>
      {/* Your image and text for step 2 */}
      <div className="img">
        <div className={`img__text m--up`}>
          <h2>Password Reset Email Sent</h2>
          <p>An email with instructions has been sent to your inbox.</p>
        </div>
      </div>
    </div>
  </div>
</div>




  );
};

export default Register;






