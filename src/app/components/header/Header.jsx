"use client"
import config from "@/app/config";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown } from "react-icons/fa";
import Link from "next/link"; // Use the Link component from Next.js
import styles from "./header.module.css";
import { useRouter } from "next/navigation";

const Header = () => {
  let [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('');
  const [showUser, setShowUser] = useState(false);
  const [imagecategory, setCategory] = useState([]);
  const [userData, setUserData] = useState([]);
  const [videocategory, setVideoCategory] = useState([]);
  // console.log(userData)

  //////FETCH USER DATA///////////////

  
 
  

  const fetchUserData = async () => {
    if (authTokens) {
      try {
        const response = await fetch(`${config.apiUrl}api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`
          }
        });


        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
          // console.log(data)
        } else if (response.status === 401) { // Check for Unauthorized status using response.status
          // Handle unauthorized access here
        }
      } catch (error) {

        console.error('Error:', error);
      }
    }
  };
  useEffect(() => {
    // Fetch transactions when the component mounts
    fetchUserData();
  }, []);

  const showUserLoggedIn = userData && userData.username;

  const router = useRouter(); // Get the router object

  const [authTokens, setAuthTokens] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    } else {
      return null;
    }
  });

  const closeUserMenu = () => {
    setShowUser(false);
  };



  useEffect(() => {
    // Fetch transactions when the component mounts
    fetchAllVideoCat();
  }, []);




  const fetchAllVideoCat = async () => {
    try {
      const response = await fetch(`${config.apiUrl}images/api/video-cat/`, {
        method: 'GET',

        redirect: 'follow',
        mode: 'cors',
      });

      if (response.status === 200) {
        const data = await response.json();
        setVideoCategory(data);
        // console.log(data)
      } else if (response.status === 401) { // Check for Unauthorized status using response.status
        // Handle unauthorized access here
      }
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      console.error('Error:', error);
    }
  };
  // console.log(videocategory)



  //////////////////////////HANDLE SEARCH/////////////
  const [searchType, setSearchType] = useState("image"); // Default search type is "image"

  const handleSearch = () => {
    if (!query) {
      // If the query is null or empty, navigate to the home page '/'
      router.push('/');
    } else {
      // Determine the search type based on the selected option
      if (searchType === "image") {
        // Image search
        router.push(`/en/${query}`);
      } else if (searchType === "video") {
        // Video search
        router.push(`/vd/${query}`);
      } else {
        // Handle other search types or show an error message
        router.push('/');
      }
    }
  };

  const handleImageSearch = () => {
    setSearchType("image"); // Set the search type to "image"
    handleSearch(); // Call the general search function
  };

  const handleVideoSearch = () => {
    setSearchType("video"); // Set the search type to "video"
    handleSearch(); // Call the general search function
  };

  
  


  //////////////////////////
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  /////////////////LOGOUT USER////////////////////////

  let logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem('authTokens');
    console.log('authTokens removed from localStorage'); // Add this line for debugging
    window.location.reload();
    // router.push('/')
    window.location.href = '/login';
  }

  ///////////////////////FETCH CATEGORY////////////////////////


  useEffect(() => {
    // Fetch transactions when the component mounts
    fetchAllCategory();
  }, []);




  const fetchAllCategory = async () => {
    try {
      const response = await fetch(`${config.apiUrl}images/api/images-cat/`, {
        method: 'GET',

        redirect: 'follow',
        mode: 'cors',
      });

      if (response.status === 200) {
        const data = await response.json();
        setCategory(data);
        // console.log(data)
      } else if (response.status === 401) { // Check for Unauthorized status using response.status
        // Handle unauthorized access here
      }
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      console.error('Error:', error);
    }
  };

  //////////////////////////UPDATE TOKEN////////////////////////


  let updateToken = async () => {

    let response = await fetch(`${config.apiUrl}api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'refresh': authTokens?.refresh })
    })

    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      localStorage.setItem('authTokens', JSON.stringify(data))

    }

    if (loading) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading && authTokens) {
      updateToken().catch((error) => {
        console.error('Token refresh failed:', error);

      });
    }
    const tokenRefreshInterval = 1000 * 60 * 60; // 1 hour

    const refreshTokenInterval = setInterval(() => {
      if (authTokens) {
        updateToken().catch((error) => {
          console.error('Token refresh failed:', error);
          // You might want to handle this error in a better way
        });
      }
    }, tokenRefreshInterval);

    return () => clearInterval(refreshTokenInterval);
  }, [authTokens, loading]);

  return (

    <div className="w-full bg-[#f7f7f8]   relative">
      <div className="max-w-container mx-auto bg-[#f7f7f8]">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24 gap-2">
          <div
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor text-2xl font-bold"
          >
            <Link href={"/"}>StockBoxPro </Link>
          </div>

          <div>
  

 
   
      
  
</div>


          
          <div className="relative w-full lg:w-[800px] text-base text-primeColor bg-white flex items-center gap-0 justify-between px-6 rounded-xl overflow-hidden">
            <select
              className="w-28 h-[50px] outline-none bg-transparent border-none text-[14px] text-black focus:ring-0 pr-[30px]"
              onChange={(e) => setSearchType(e.target.value)}
              value={searchType}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input
              className="w-full h-[50px] outline-none placeholder-text-[#C4C4C4] placeholder-text-[14px] focus:ring-0 pr-[30px] border-none"
              type="text"
              placeholder="Search Photos"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={handleKeyPress}
            />
            <FaSearch onClick={handleSearch} className="w-5 h-5 border-none" />
          </div>






          <div

            className="flex h-14 cursor-pointer items-center gap-2 text-black-400 px-4 py-1  border-b-gray-400 hover.border-b-white hover:text-white hover:text-yellow-400 duration-300 cursor-pointer"
          >
            <Link href={"/subscription"}>Pricing</Link>

          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative ml-auto lg:ml-0">
            <div onClick={() => setShowUser(!showUser)} className="flex" >
              <FaUser />
              <FaCaretDown />
            </div>

            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ left: showUserLoggedIn ? '-120px' : '-140px' }}
                className={`absolute top-6  z-50 bg-[#f7f7f8] w-60 text-white h-auto p-7  ${styles['mobile-menu-shift']}`}
              >
                {showUserLoggedIn ? (
                  <>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover:text-white hover:text-yellow-400 duration-300 cursor-pointer" onClick={closeUserMenu}>
                      {showUserLoggedIn}
                    </li>
                    <Link href="/account">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover:text-white hover:text-yellow-400 duration-300 cursor-pointer" onClick={closeUserMenu}>
                        Account
                      </li>
                    </Link>

                    <li
                      onClick={() => {
                        logoutUser(); // Call the logoutUser function
                        closeUserMenu(); // Close the user menu after logout
                      }}
                      className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white hover:text-yellow-400 duration-300 cursor-pointer"
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover:text-white hover:text-yellow-400 duration-300 cursor-pointer" onClick={closeUserMenu}>
                        Login
                      </li>
                    </Link>
                    <Link onClick={() => setShowUser(false)} href="/register">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover:text-white hover:text-yellow-400 duration-300 cursor-pointer" onClick={closeUserMenu}>
                        Sign Up
                      </li>
                    </Link>
                  </>
                )}
                <Link href={"/about"}>
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover:text-white hover:text-yellow-400 duration-300 cursor-pointer" onClick={closeUserMenu}>
                    About Us
                  </li>
                </Link>
              </motion.ul>
            )}
          </div>
        </header>
      </div>
     
<div>
  <ul className="flex flex-wrap justify-center space-x-2 mt-4">
    {searchType === "image" ? (
      // Render the image category list when searchType is "image"
      imagecategory.map((category, index) => (
        <li
          key={index}
          className="text-xl font-ubuntu font-bold text-gray-600 hover:text-yellow-400 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out m-1 cursor-pointer"
        >
          <Link href={`/en/${category.category_name}`}>
            {category.category_name}
          </Link>
        </li>
      ))
    ) : (
      // Render the video category list when searchType is "video"
      Array.from(new Set(videocategory.map((item) => item.video_category))).map((category, index) => (
        <li
          key={index}
          className="text-xl font-ubuntu font-bold text-gray-600 hover:text-yellow-400 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out m-1 cursor-pointer"
        >
          <Link href={`/vd/${category}`}>
            {category}
          </Link>
        </li>
      ))
    )}
  </ul>
</div>


      
    </div>
  );
};

export default Header;



{/* 
          <div className="relative w-full lg:w-[800px] text-base text-primeColor bg-white flex items-center gap-0 justify-between px-6 rounded-xl overflow-hidden">
            <input
              className="w-full h-[50px] outline-none placeholder-text-[#C4C4C4] placeholder-text-[14px] focus:ring-0 pr-[30px] border-none"
              type="text"
              placeholder="Search Photos"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={handleKeyPress}
            />
            <FaSearch
              onClick={handleSearch}
              className="w-5 h-5 border-none"
            />
          </div> */}