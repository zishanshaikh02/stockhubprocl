// "use client"
// import { useRouter } from 'next/navigation';
// import { useAuth } from './Provider/TokenProvider'; // Import your authentication context or hook

// const PrivateRoute = ({ children }) => {
//   const router = useRouter();
//   const { authTokens } = useAuth();
//   const isUserLoggedIn = authTokens && authTokens.access;


//   if (isUserLoggedIn) {
//     // Redirect the user to the dashboard or any other page
//     router.push('/'); // Replace '/dashboard' with the URL you want to redirect to
//     return null;
//   }
//   return children;
// };

// export default PrivateRoute;
