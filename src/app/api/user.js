
"use client"
// import config from "../config"
// import { useAuth } from '../Provider/TokenProvider';
// import axios from 'axios';

// export async function getUser() {
//   const { authTokens } = useAuth();

//   try {
//     let url = `${config.apiUrl}api/user`;

//     const response = await axios.get(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${authTokens.access}`
//       }
//     });

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error('Request failed with status code ' + response.status);
//     }
//   } catch (error) {
//     if (error.response) {
//       // Handle specific error cases based on the response status code
//       if (error.response.status === 401) {
//         throw new Error('Unauthorized: You do not have the necessary credentials.');
//       } else if (error.response.status === 404) {
//         throw new Error('Not Found: The requested resource was not found.');
//       }
//       // Add more error handling as needed for other status codes.
//     } else if (error.request) {
//       // Handle request-related errors (e.g., no network connection)
//       throw new Error('Failed to make the request. Please check your network connection.');
//     } else {
//       // Handle other unexpected errors
//       throw new Error('An unexpected error occurred: ' + error.message);
//     }
//   }
// }
// ./src/app/api/user.js
import config from "../config";
import { useAuth } from '../Provider/TokenProvider';
import axios from 'axios';

export async function getUserData() {
  const { authTokens } = useAuth();

  try {
    let url = `${config.apiUrl}api/user`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Request failed with status code ' + response.status);
    }
  } catch (error) {
    // Handle errors as needed
    console.error('Error in getUserData:', error);
    throw error; // Rethrow the error for the calling component to handle
  }
}
