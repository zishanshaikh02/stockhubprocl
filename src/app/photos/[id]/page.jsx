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
import Image from 'next/image';

const ImageDetail = ({ params: { id } }) => {
  // State to store the image data
  const [imageData, setImageData] = useState(null);
  const [relatedimage, setRelatedImages] = useState(null);
  const { authTokens } = useAuth();
  const router = useRouter()
  const [relatedimage2, setRelatedImages2] = useState(null);

  ////////////////////FETCH IMAGES///////////////////////

  useEffect(() => {
    async function fetchData() {

      try {
        const imageResponse = await axios.get(`${config.apiUrl}images/api/images/${id}`);
        if (imageResponse.status === 200) {
          setImageData(imageResponse.data);
        } else {
          throw new Error('Request failed with status code ' + imageResponse.status);
        }

        const nat = imageResponse.data.category


        const relatedImagesResponse = await axios.get(`${config.apiUrl}images/api/images-cat/?search_keyword=${nat}`);
        if (relatedImagesResponse.status === 200) {
          // console.log(relatedImagesResponse.data)
          // setRelatedImages(relatedImagesResponse.data[0].image_cat);
          setRelatedImages(relatedImagesResponse.data[0]);
          // console.log(relatedImagesResponse.data[0])
        } else {
          throw new Error('Request failed with status code ' + relatedImagesResponse.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [id]);

  if (!imageData) {
    // You can render a loading indicator or handle the loading state here
    return <div>Loading...</div>;

  }

  ///////////////////HANDLE DOWNLOAD//////////////////
  const handleDownload = async (imageId, imageName) => {
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
          const downloadResponse = await fetch(`http://127.0.0.1:8000/images/image-download/${imageId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authTokens.access}`, // Pass your JWT token here
            },
            redirect: 'follow',
            mode: 'cors',
          });
          console.log(downloadResponse)

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


    <>
      
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
            {/* <img src={imageData.copy_img} alt="" srcSet="" /> */}
            <Image src={imageData.copy_img} height={100} width={1000} alt="" srcSet="" />

     

          </div>
          <div className="descrpiton">
            <h1 style={{ textAlign: 'start' }}>
              {imageData.name}
            </h1>
            <div className="desc-text">
              {imageData.description}
            </div>
            <button onClick={() => handleDownload(imageData.id, imageData.name)} className="button-arounder">Download</button>
          </div>
        </div>
        <hr />
        <div className="realetd-img-container">
          <h1>
            Related Images....
          </h1>
          <div className="items">


            {relatedimage && relatedimage.image_cat && Array.isArray(relatedimage.image_cat) && (
              relatedimage.image_cat
                .slice()
                .sort(() => Math.random() - 0.5) // Shuffle the array randomly
                .slice(0, 3) // Take the first 3 imagesclassName="column-xs-12 column-md-4"
                .map((image, index) => (

                  <div key={index} className="item">

                    <Link href={`/photos/${image.id}`}>
                   
                         <Image
                        src={image.copy_img}
                        alt={image.name}
                        style={{ width: '300px', height: '200px' }}
                        height={100}
                        width={600}
                     
                        
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

export default ImageDetail;

