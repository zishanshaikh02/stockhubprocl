"use client"
import config from '@/app/config';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/Provider/TokenProvider';
import styles from './page.css'
import Header from '@/app/components/header/Header';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '@/app/components/footer/Footer';

const VideoDetail = ({ params: { id } }) => {
  // State to store the image data
  const [videoData, setVideoData] = useState(null);
  const [relatedvideo, setRelatedVideo] = useState(null);
  const { authTokens } = useAuth();
  const router = useRouter()
  const [relatedimage2, setRelatedImages2] = useState(null);

  ////////////////////FETCH IMAGES///////////////////////

  useEffect(() => {
    async function fetchData() {

      try {
        const VideoResponse = await axios.get(`${config.apiUrl}images/api/video-cat/${id}`);
        if (VideoResponse.status === 200) {
          setVideoData(VideoResponse.data);
        } else {
          throw new Error('Request failed with status code ' + VideoResponse.status);
        }

        const nat = VideoResponse.data.video_category
        // console.log(nat)


        const relatedVideoResponse = await axios.get(`${config.apiUrl}images/api/video-cat/?search_keyword=${nat}`);
        // console.log(relatedVideoResponse)
        if (relatedVideoResponse.status === 200) {
          // console.log(relatedImagesResponse.data)
          // setRelatedImages(relatedImagesResponse.data[0].image_cat);
          setRelatedVideo(relatedVideoResponse.data);
          // console.log(relatedvideo)
          // console.log(relatedImagesResponse.data[0])
        } else {
          throw new Error('Request failed with status code ' + relatedVideoResponse.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [id]);

  if (!videoData) {
    // You can render a loading indicator or handle the loading state here
    return <div>Loading...</div>;

  }

  ///////////////////HANDLE DOWNLOAD//////////////////
  const handleDownload = async (videoId, videoName) => {
    if (!authTokens || !authTokens.access) {
      // router.push('/login');
      window.location.href = '/login';

      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}images/check-subscription-status/`, {
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
          const downloadResponse = await fetch(`${config.apiUrl}images/video-download/${videoId}`, {
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
            a.download = `${videoName}.mp4`;
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


    <>
      {/* <Header /> */}
      <ToastContainer position="top-center" // You can change this to 'top-center' or any other valid position
        className="toast-center" // Apply the custom centering styles
      />
      <div className='cross'>

      <button onClick={() => router.back()}
        className="absolute top-40 right-2 text-gray-500 hover:text-gray-800 text-lg cursor-pointer md:text-xl lg:text-2xl  md:top-40" style={{ backgroundColor: 'f7f7f8' }}>
        &#x2715;
      </button>
      </div>


      <div className="container">
        <div className="current-img">
          <div className="image">
          <video src={videoData.video}  controls controlsList="nodownload"    autoPlay={false}  style={{
          width: '100%',
          height: '100%',
          // Additional styles for mobile devices
          '@media only screen and (max-width: 600px)': {
            width: '100%',
            height: 'auto', // Adjust height as needed
          },
        }}
 />
            {/* <div className="copyright">&copy;StockboxPro</div> */}

          </div>
          <div className="descrpiton">
            <h1 style={{ textAlign: 'start' }}>
              {videoData.name}
            </h1>
            <div className="desc-text">
              {videoData.description}
            </div>
            <button onClick={() => handleDownload(videoData.id, videoData.name)} className="button-arounder">Download</button>
          </div>
        </div>
        <hr />
        <div className="realetd-img-container">
          <h1>
            Related Videos....
          </h1>
          <div className="items">


            {relatedvideo && relatedvideo && Array.isArray(relatedvideo) && (
              relatedvideo
                .slice()
                .sort(() => Math.random() - 0.5) // Shuffle the array randomly
                .slice(0, 3) // Take the first 3 imagesclassName="column-xs-12 column-md-4"
                .map((video, index) => (

                  <div key={index} className="item">

                    <Link href={`/video/${video.id}`}>
                    <video src={videoData.video}  controls   autoPlay={false}  controlsList="nodownload"
                        style={{ width: '300px', height: '200px' }}
                      />

                    </Link>
                  
                  </div>
                ))
            )}

          </div>
        </div>
        <Footer />
      </div>

    </>

  );
};

export default VideoDetail;

