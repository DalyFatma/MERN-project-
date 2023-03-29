import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function Homepage() {
  return (
    <div>
      <header>
        <h2>
          <Link to="/">Explore the world of beauty hacks with our hub!</Link>
        </h2>
        <nav>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </nav>
      </header>
      <section className="hero">
        <div className="background-image" />
        <div className="hero-content-area">
          <h1>Beauty is Life!</h1>
          <h3>Join Our Community and Explore the World of Beauty Hacks!</h3>
          <Link to="/register" className="btn">
            Join Us Now
          </Link>
        </div>
      </section>
      <section className="destinations">
        <h3 className="title">Beauty Hub: Product Reviews and Tips</h3>
        <p>
          Looking for beauty products that work? Want to learn how to create
          stunning looks? Join our beauty hub community and get the latest
          reviews and tips from experts and enthusiasts.
        </p>
        <hr />
        <ul className="grid">
          <li className="small image-1" />
          <li className="large image-2" />
          <li className="large image-3" />
          <li className="small image-4" />
        </ul>
      </section>
      <section id="about" className="packages">
        <h3 className="title">Beauty Hacks and Product Reviews</h3>
        <p>
          Get the latest beauty tips and product reviews from our team of
          experts. From skincare to makeup, we've got you covered!
        </p>
        <hr />
        <ul className="grid">
          <li>
            <i className="fa fa-lightbulb-o fa-4x" />
            <h4>Hacks and Tips</h4>
            <p>
              Discover the latest beauty hacks and tips to help you look and
              feel your best. From DIY remedies to expert advice, we'll help you
              achieve your beauty goals.
            </p>
          </li>
          <li>
            <i className="fa fa-star fa-4x" />
            <h4>Product Reviews</h4>
            <p>
              Find out which beauty products are worth your money. Our team of
              experts tests and reviews the latest skincare, makeup, and
              haircare products, so you don't have to.
            </p>
          </li>
          <li>
            <i className="fa fa-heart fa-4x" />
            <h4>Community Favorites</h4>
            <p>
              See what other beauty enthusiasts are raving about. Our community
              shares their favorite products and beauty tips, so you can
              discover new must-haves.
            </p>
          </li>
          <li>
            <i className="fa fa-users fa-4x" />
            <h4>Beauty Community</h4>
            <p>
              Connect with like-minded beauty lovers in our online community.
              Share your own beauty tips and product reviews, and get inspired
              by others.
            </p>
          </li>
        </ul>
      </section>
      <section className="testimonials">
        <h3 className="title">Testimonials from our customers:</h3>
        <hr />
        <div className="testimonials-flex">
          <figure className="snip1574">
            <img
              src="https://dqt8gd4elnkw6.cloudfront.net/image/5-Korean-Beauty-Hacks-You-Need-to-Know.jpg"
              alt="profile-sample2"
            />
            <figcaption>
              <blockquote>
                <p className="testimonials-text">
                  I was struggling with acne for years, but after using the
                  skincare routine recommended by this app, my skin has never
                  looked better! Thank you so much!
                </p>
              </blockquote>
              <h3>- Samantha</h3>
            </figcaption>
          </figure>
          <figure className="snip1574">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFPzJF454zHnP7Cdtp7bs9gtYWkjdw43usV0flqyWTW_mt4me7F098n1SeRkR3_-LNyPY&usqp=CAU"
              alt="profile-sample7"
            />
            <figcaption>
              <blockquote>
                <p p className="testimonials-text">
                  I tried out the DIY hair mask recipe on this app and it made
                  my hair so soft and shiny! Plus, it's all natural ingredients
                  so I know it's good for my hair.
                </p>
              </blockquote>
              <h3>-Emily</h3>
            </figcaption>
          </figure>
          <figure className="snip1574">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YbNURgOWM_hK5TUHl4osu9a1heDXSKxnVxprOtpES3LsY6pQN9acPSWPV7sRGRdyYoA&usqp=CAU"
              alt="profile-sample6"
            />
            <figcaption>
              <blockquote>
                <p p className="testimonials-text">
                  I never knew how to do winged eyeliner properly until I
                  watched the tutorial on this app. Now I can do it flawlessly
                  every time!
                </p>
              </blockquote>
              <h3>-Sarah</h3>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="contact" className="contact">
        <h3 className="title">Learn more</h3>
        <p>
          Have questions, comments, or suggestions for us? Want to share your
          own beauty hacks or product recommendations? We'd love to hear from
          you!
        </p>
        <hr />
        <form>
          <input type="email" placeholder="Email" />
          <Link to="/contact" className="btn">
            Subscribe now
          </Link>
        </form>
      </section>
      <footer>
        <p>
          Why are you even reading this?! There's never anything interesting in
          the footer!
        </p>
        <ul>
          <li>
            <Link to="">
              <i className="fa fa-twitter-square fa-2x" />
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="fa fa-facebook-square fa-2x" />
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="fa fa-snapchat-square fa-2x" />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Homepage;
