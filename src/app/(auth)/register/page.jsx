"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, verifyOTP } from '@/app/api/register';
import styles from './page.scss';
import Link from 'next/link';
import { color } from "framer-motion";
const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpInputVisible, setOtpInputVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");




  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length >= 8) {
      setPasswordError("");
    } else {
      setPasswordError("Password should be at least 8 characters long");
    }
  }


  const handleRegistration = async () => {
    try {
      setLoading(true);
      // toast.info("loading");


      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        return; // Exit early if passwords do not match
      } else {
        setConfirmPasswordError(""); // Clear the error message when passwords match
      }
      toast.info('loading...', { autoClose: true, closeButton: false, });

      const userData = {
        email: email,
        username: username,
        password: password,
      };

      const response = await registerUser(userData);

      if (response && response.message) {
        setOtpInputVisible(true);
        toast.dismiss();
        toast.success("Registration successful. OTP sent to your email.");
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Check for network errors


      if (error.response && error.response.status === 400) {
        // Check if the error response has a specific format for email duplication
        const errorData = error.response.data;
        if (errorData.email && Array.isArray(errorData.email) && errorData.email.length > 0) {
          const emailErrorMessage = errorData.email[0];
          console.log(emailErrorMessage);
          toast.dismiss();
          // setOtpError(emailErrorMessage)
          toast.error(`${emailErrorMessage}`);
        } else {
          toast.error("Registration error. Please try again.");
        }
      } else {
        toast.error("Registration error. Please try again.");
        if (error.message) {
          toast.dismiss();
          toast.error("Network error. Please check your connection and try again.");
          return;
        }
      }
    } finally {
      setLoading(false);
    }
  };




  const handleVerifyOTP = async () => {
    try {
      const otpData = {
        email: email,
        otp: otp,
      };

      const response = await verifyOTP(otpData);


      if (response && response.status === 200) {
        toast.success("OTP verification successful. Successfully registered.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);



      } else {
        setOtpError("Enter OTP is Incorrect");
        toast.error("OTP verification failed. Please check your OTP and try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setOtpError("OTP verification error. Please try again.");
      toast.error("OTP verification error. Please try again.");
    }
  }













  return (
    <>
      <ToastContainer

      />


      <div className='bodycont'>

        <div className="cont s--signup">

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
              <Link href={"/login"}>
                <div className="img__btn">

                  <span className="m--in">Sign In</span>

                </div>
              </Link>
            </div>
            {/* <form onSubmit={handleSubmit}> */}
            <div className="form sign-up">
              <h2>Time to feel like home,</h2>
              <label>
                <span>Name</span>
                <input type="text"
                  placeholder="Username"
                  // value={formData.username}
                  // onChange={(e) => setFormData({ ...formData, username: e.target.value })}  />
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </label>
              <label>
                <span>Email</span>
                <input type="email"
                  placeholder="Email"
                  // value={formData.email}
                  // onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </label>

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


              <button className="submit" onClick={handleRegistration} disabled={loading}>
                {loading ? "Loading..." : "Register"}
                {/* {loading ? toast.info('Registering...') : "Register"} */}

              </button>

              {otpInputVisible && (
                <>
                  <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ width: "100px", margin: "auto" }}
                  />

                  <button type="button" className="submit" onClick={handleVerifyOTP}>
                    Verify OTP
                  </button>

                  <h5 className="otp-error" style={{ color: "red", fontSize: "14px", marginTop: "8px", width: "100%", textAlign: "center" }}>
                    {otpError}
                  </h5>
                </>
              )}

              {/* <button type="button" className="fb-btn">
                Join with <span>facebook</span>

              </button> */}


              <Link href={'/login'}>
                <button type="button" className="mobile-sign-in-button">
                  Sign In
                </button>
              </Link>
            </div>



          </div>
        </div>
      </div>



    </>



  );
};

export default Register;






