"use client"
import React from 'react';
import Typewriter from "typewriter-effect";

export default function Banner() {
  const data = [
    "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/11/autumn_fireball/17255671-1-eng-GB/Autumn_fireball.jpg"
  ];
  const bannerStyle = {
    backgroundImage: `url(${data[0]})`,
    width: "100%",
    // backgroundSize: 'cover',

    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    height: '100vh', // Full height
    display: 'flex',
    alignItems: 'center', // Center content vertically
    justifyContent: 'center', // Center content horizontally
  };


  return (


    <div className="bg-gradient-to-b from-blue-500 to-blue-800 text-white" style={bannerStyle} loading='lazy'>


      <div className="absolute top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl py-8 sm:py-4 md:py-6 lg:py-8 xl:py-10 ">

        <Typewriter
          options={{
            loop: true, // Set loop to true to make the animation loop
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("You don’t take a photograph, you make it")
              .pauseFor(1000)
              .deleteAll()
              .typeString("Welcomes You")
              .start();
          }}


        />
      </div>


    </div>

  );
}
