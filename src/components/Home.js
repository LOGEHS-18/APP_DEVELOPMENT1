import React from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
const Blog = () => {
  return (
    <div>
    <Navbar />
    <div className="container1">
      <img src="https://cdn.shopify.com/s/files/1/1288/8361/files/lego_banner.png?3512030035680509934" alt="Toy Logo" className="image" />
      <Link to="/login" className="button">Shop Your Toys!</Link><br></br><br></br>
      <div className="content">
        <div className="left">
          <br></br>
          <br></br>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5jNjYe2z6YuLOhQewZTfafc2WjkltQnVC2GDBJvMKSuUrvkCVlCZtYMckYF4u9Texgx8&usqp=CAU" alt="Toy Factory" className="image-left" />
        </div>
        <div className="right">
          <h2>About Us</h2>
          <p style={{ textAlign: 'justify' }}>At FunToys, we're passionate about creating toys that inspire creativity and imagination. Our team of designers and manufacturers work tirelessly to bring you the best toys possible. We're committed to using only the safest and highest-quality materials, ensuring that every toy meets rigorous safety standards. Our toys are not just products; they are tools that help children learn, grow, and explore their world. We believe in the power of play and its ability to shape young minds positively. From concept to creation, every step of our process is infused with care and dedication, aiming to spark joy and wonder in children everywhere. Our diverse range of toys, from classic favorites to innovative new designs, caters to children of all ages and interests. We're proud to say that our toys are loved by children all around the world, and we are constantly striving to bring more joy, laughter, and learning to families everywhere. Join us on our mission to make the world a more playful place, one toy at a time.</p>

          </div>
      </div>
      <div className="links">
        <div className="left-links">
          <ul>
            <li><a href="#">Our Toys</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="right-links">
          <ul>
            <li><a href="#" target="_blank"><i className="bi bi-facebook"></i> Follow us on Facebook!</a></li>
            <li><a href="#" target="_blank"><i className="bi bi-twitter"></i> Follow us on Twitter!</a></li>
            <li><a href="#" target="_blank"><i className="bi bi-instagram"></i> Follow us on Instagram!</a></li>
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
    </div>
  );
};

export default Blog;