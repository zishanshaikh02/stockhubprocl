import React from 'react';
import Header from '../components/header/Header';
import styles from './page.css';
import Footer from '../components/footer/Footer';
import Image from 'next/image';
const About = () => {
  return (

    <>
 
    <div className="App">
      <section id="about-section">
        <div className="about-left">
          <Image height={100} width={600}  src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="About Img" />
        </div>
        <div className="about-right">
          <h4>Co-Founder</h4>
          <h1>Zishan</h1>
          <p>
            {/* Your about section content */}
          </p>
          <div className="address">
            <ul>
              <li>
                <span className="address-logo">
                  <i className="fas fa-paper-plane"></i>
                </span>
                <p>Address</p>
                <span className="saprater">:</span>
                <p>Jaipur, Rajasthan, India</p>
              </li>
              <li>
                <span className="address-logo">
                  <i className="fas fa-phone-alt"></i>
                </span>
                <p>Phone No</p>
                <span className="saprater">:</span>
                <p>+91 987-654-4321</p>
              </li>
              <li>
                <span className="address-logo">
                  <i className="far fa-envelope"></i>
                </span>
                <p>Email ID</p>
                <span className="saprater">:</span>
                <p>crowncoder@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="section1">
          <div className="text-area">
            <h1>About us</h1>
            <p>
            Welcome to StockBoxPro, your one-stop destination for premium stock media content. We are passionate about providing you with the highest quality stock images, videos, and more to fuel your creativity and help you bring your projects to life.
            </p>
          </div>
          <div className="img">
            <Image height={100} width={600}  src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" srcSet="" />
          </div>
        </div>
      </section>

      <section>
        <div className="section2">
          <div className="img">
            <Image height={100} width={600}  src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" srcSet="" />
          </div>
          <div className="text-area">
            <h1>Our Mission</h1>
            <p>
            At StockBoxPro, our mission is simple yet powerful: to offer a diverse and ever-expanding collection of stock media that meets the needs of content creators, businesses, and individuals alike. We're here to empower your creativity, support your storytelling, and enhance your projects through a vast library of visually stunning and professionally crafted assets.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section2">
          <div className="text-area">
            <h1>What Sets Us Apart</h1>
            <b>Quality:</b>
            <p>Our commitment to quality is unwavering. {/* More content */}</p>
            <b>Diversity:</b>
            <p>We understand the importance of diversity in visual storytelling. {/* More content */}</p>
            <b>Ease of Use:</b>
            <p>We've designed our platform with user-friendliness in mind. {/* More content */}</p>
          </div>
          <div className="img">
            <img src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" srcSet="" />
          </div>
        </div>
      </section>

      <section>
        <div className="team-section">
          <h1>Our Team Members</h1>
          <div className="items">
            <div className="item">
              <Image height={100} width={600}  src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" srcSet="" />
            </div>
            <div className="item">
              <Image height={100} width={600}  src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" srcSet="" />
            </div>
            <div className="item">
              <Image height={100} width={600}  src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" srcSet="" />
            </div>
          </div>
        </div>
      </section>

      <section >
        <h1 style={{ textAlign: 'center', margin: '10px', padding: '10px', fontSize:'40px', fontWeight: 'bold'}}>Subscription-Based Licenses</h1>
        <p style={{ textAlign: 'center', margin: '20px' }}>
          At StockBoxPro, we understand that our customers have diverse needs when it comes to the usage of the stock media they download through our subscription profiles. That's why we offer flexible licensing options designed to provide you with the freedom to use our content in various ways.
        </p>
      </section>

      <section>
        <div className="term-condition">
          <div className="text-area1">
          <h1 style={{ textAlign: 'center', margin: '10px', padding: '10px', fontSize: '40px'}}>Multi-Usage:</h1>

            <p>With our subscription profiles, you have the freedom to use the downloaded stock media in multiple projects across various platforms and media types. {/* More content */}</p>
          </div>
          <div className="text-area2">
          <h1 style={{ textAlign: 'center', margin: '10px', padding: '10px', fontSize:'40px'}}>Worldwide:</h1>
            <p>Our subscription licensing allows you to use the downloaded content globally. {/* More content */}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="term-condition">
          <div className="text-area1">
          <h1 style={{ textAlign: 'center', margin: '10px', padding: '10px', fontSize:'40px'}}>Commercial and Editorial Use:</h1>
            <p>You can confidently use the stock media for both commercial and editorial purposes. {/* More content */}</p>
          </div>
          <div className="text-area2">
          <h1 style={{ textAlign: 'center', margin: '10px', padding: '10px', fontSize:'40px'}}>Payment</h1>
            <p>If you make a purchase on the Website, you agree to provide accurate and complete payment information. {/* More content */}</p>
          </div>
        </div>
      </section>

      <section>
        <h1 style={{ textAlign: 'center', margin: '20px', padding: '10px', fontSize:'40px', fontWeight: 'bold',background: '#0000'}}>Our Terms & Conditions</h1>
        <section>
          <div className="term-condition">
            <div className="text-area1">
            <h1 style={{ textAlign: 'center', margin: '10px', padding: '10px', fontSize:'40px'}}>Acceptance of Terms</h1>
              <p>By accessing and using the Website, you accept and agree to be bound by these Terms. {/* More content */}</p>
            </div>
            <div className="text-area2">
            <h1 style={{ textAlign: 'center', margin: '10px', padding: '10px', fontSize:'40px'}}>Account Registration</h1>
              <p>To access certain features of the Website, you may be required to create an account. {/* More content */}</p>
            </div>
          </div>
        </section>
      </section>


    


    </div>

    <Footer/>
    

  </>



  );
};

export default About;
