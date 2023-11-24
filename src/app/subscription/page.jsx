"use client"
import config from '../config';
import React, { useState , useEffect} from 'react';
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadScript,showSuccessMessage,showErrorMessage  } from '../razorpay';
import { useAuth } from '@/app/Provider/TokenProvider';
import axios from 'axios';
import styles from './page.css';
import Header from '../components/header/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Subscription = () => {
    const { authTokens } = useAuth();
    const [userData, setUserData] = useState([]);
    
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing function for animations
      delay: 150, // Delay between animations in milliseconds
    });
  }, []); 

  /////////////////////////FETCH USER DATA/////////////////////

    // useEffect(() => {
    //     // Fetch transactions when the component mounts
    //     fetchUserData();
    //   }, []);


    
      
     const fetchUserData = async () => {
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
          // Handle any other errors that may occur during the fetch
          console.error('Error:', error);
        }
      };
      useEffect(() => {
        // your effect code
      }, [fetchUserData]);


    /////////////////////FETCH MEMBERSHIP//////////////////////////////
    const [memberships, setMemberships] = useState([]);
    const [selectedMembership, setSelectedMembership] = useState(null);

    useEffect(() => {
        const fetchMembership = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}images/memberships/`);
                const data = response.data;
                setMemberships(data); // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMembership(); // Call the function to fetch membership data
    }, []);


////////////////////////COMPLETE ORDER//////////////////////////////////


const complete_order = (paymentID, orderID, signature, selectedMembership) => {
  console.log(selectedMembership.membership_type)
    const data = {
        payment_id: paymentID,
        order_id: orderID,
        amount: selectedMembership.price,
        signature: signature,
        membership_type: selectedMembership.membership_type,
        duration: selectedMembership.duration,
        duration_period: selectedMembership.duration_period,
        username : userData.username,
        email : userData.email
        
    };
    console.log('Request Payload:', data);

    fetch(`${config.apiUrl}payment/order/complete/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`, // Add your JWT token here
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();

        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then((responseData) => {
        console.log(responseData);
        toast.success('Subscribe Successfully.', {
          onClose: () => {
            // Use window.history to go back to the previous page
            window.history.back();
          }
        });
        
    })
    .catch((error) => {
        console.log(error);
        // Handle the error here
    });
};

      
////////////////////////////////CREATE ORDER//////////////////////////////////

    const handleSubscription = async (membership) => {
  
        try {
          const res = await loadScript(); // Load Razorpay script
          if (!res) {
            return;
          }
    
          // Make a POST request to create a Razorpay order on the Django backend
          const orderResponse = await fetch(`${config.apiUrl}payment/order/create/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: membership.price,
              currency: 'INR',
              membership_type :membership.membership_type,
              duration :membership.duration,
             duration_period: membership.duration_period,
            //  amount: membership.membership_price
             
    
              // Change as needed
            }),
          });
    
          if (orderResponse.ok) {
            const orderData = await orderResponse.json();
            const  order_id  = orderData.data.id;
            const options = {
              key: config.RAZORPAY_KEY,
              amount: membership.price * 100, // Amount in paise
              currency: 'INR',
              // order_id: order_id,

              handler: function (response) {
    
                //complete order
                complete_order(
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature,
                    membership
                )

              },
    
            prefill: {
            name: "STOCKBOXPRO",
            email: "youremail@example.com",
            contact: "9999999999",
            },
            notes: {
            address: "Razorpay Corporate Office",
            },
            theme: {
            color: "#3399cc",
            },
        };
    
            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } else {
            showErrorMessage('Error creating Razorpay order');
          }
        } catch (error) {
          showErrorMessage(error.message);
        }
      };

    return (

<>
{/* <Header /> */}
<ToastContainer/>
<div id="generic_price_table">
<section>
  <div className="container">
    <div className="row flex flex-wrap" data-aos="slide-up">
      
      {memberships.map((membership, index) => (
        <div className="col-md-4" key={index}>

          <div className="generic_content clearfix m-4">
            <div className="generic_head_price clearfix">
              <div className="generic_head_content clearfix">
                <div className="head_bg"></div>
                <div className="head">
                  <span>{membership.membership_type}</span>
                </div>
              </div>
              <div className="generic_price_tag clearfix">
                <span className="price">
                  {/* <span className="sign">Rs</span> */}
                  <span className="currency">Rs {membership.price}</span>
                  <span className="cent"></span>
                  <span className="month">{membership.duration}/{membership.duration_period}</span>
                </span>
              </div>
            </div>
            <div className="generic_feature_list">
              <ul>
              
                <li>
                  <span>{membership.hostDomains}</span> Unlimited Photos
                </li>
                <li>
                  <span>{membership.support}</span> Support
                </li>
              </ul>
            </div>
            <div className="generic_price_btn clearfix">
              <a className=""  onClick={() => {
          setSelectedMembership(membership); // Set selected membership
          handleSubscription(membership); // Pass selected membership to the function
        }}>
                Sign up
              </a>
             
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
</div>
</>


    );
};

export default Subscription;






