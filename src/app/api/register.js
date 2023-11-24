import axios from 'axios';

import config from "../config"
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${config.apiUrl}api/register/`, userData);
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    throw error;
  }
};

// Function to make a POST request to the verify OTP view
export const verifyOTP = async (otpData) => {
  try {
    const response = await axios.post(`${config.apiUrl}api/verify/`, otpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
