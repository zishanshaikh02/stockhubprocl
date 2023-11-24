"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/Provider/TokenProvider';
import { toast, ToastContainer } from "react-toastify";

const DownloadButton = (imageId) => {
    const { authTokens } = useAuth();
    const router = useRouter()
    console.log(imageId)

    const handleDownload = async (videoId, videoName) => {
        if (!authTokens || !authTokens.access) {
          // router.push('/login');
          window.location.href = '/login';
    
          return;
        }
    
        try {
          const response = await fetch('http://127.0.0.1:8000/images/check-subscription-status/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authTokens.access}`, // Pass your JWT token here
            },
            redirect: 'follow',
            mode: 'cors',
          });
    
          if (response.status === 200) {
            const data = await response.json();
    
            if (data.active) {
              // User has an active subscription, proceed with the download
              const downloadResponse = await fetch(`http://127.0.0.1:8000/images/image-download/${imageId}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${authTokens.access}`, // Pass your JWT token here
                },
                redirect: 'follow',
                mode: 'cors',
              });
    
              if (downloadResponse.status === 200) {
                const blob = await downloadResponse.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${imageName}.png`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              } else {
                console.error('Download error:', downloadResponse.statusText);
              }
            } else {
              toast.loading('You must have an active subscription to download this image.');
              // window.location.reload();
              // router.push('/')
              setTimeout(() => {
                window.location.href = '/subscription';
              }, 1000);
    
            }
          } else {
            console.error('Subscription status check error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  return (
    <div className="icon-overlay">
      <button onClick={handleDownload}  className="overlay-icon" style={{

      }}>
        <FontAwesomeIcon
          icon={faDownload}
          style={{
            fontSize: '25px',
            color: '45c7eb',
            cursor: 'pointer',
            position: 'absolute',
            bottom: '10px',
            left: '400px',
            right: '10px',
          }}
        />
      </button>
    </div>
  );
};

export default DownloadButton;
