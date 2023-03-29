import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HackCard from "../HackCard/HackCard";
import ProductCard from "../ProductCard/ProductCard";
import "./HairCare.css";
import Carousel from "react-bootstrap/Carousel";

function HairCare() {
  const hacks = useSelector((state) => Object.values(state.hackReducer.hacks));
  const products = useSelector((state) => Object.values(state.productReducer.products));
  const [query, setQuery] = useState("");
  const [queryProduct, setQueryProduct] = useState("");
  const [searchedHacks, setSearchedHacks] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);

  const handleSearch = () => {
    const filteredHacks = hacks.filter((hack) => {
      const title = hack.title?.toLowerCase();
      const description = hack.description?.toLowerCase();
      return title?.includes(query) || description?.includes(query);
    });
    setSearchedHacks(filteredHacks);
  };
  
  useEffect(() => {
    if (!query) {
      setSearchedHacks(hacks);
    } else {
      handleSearch();
    }
  }, [query, hacks]);

  const handleSearchProducts = () => {
    const filteredProducts = products.filter((product) => {
      const name = product.name?.toLowerCase();
      return name?.includes(queryProduct);
    });
    setSearchedProducts(filteredProducts);
  };
  
  useEffect(() => {
    if (!queryProduct) {
      setSearchedProducts(products);
    } else {
      handleSearchProducts();
    }
  }, [queryProduct, products]);
  
  

  return (
    <div>
      <section id="hero">
        <div id="background-image" />
        <div id="hero-content-area">
          <h1>Unlock the Secrets to Perfect Beauty Hair!</h1>
          <h3>
            You can now add and explore more about Hair care hacks and Reviewed
            Products!
          </h3>
        </div>
      </section>

      <section id="cardhack-section">
        <h2 className="title-section">
          Explore Our Collection of Hair Care Hacks
        </h2>
        <div className="input-group">
          <input
            type="search"
            className="form-control search-input"
            id="search"
            placeholder="Search"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            pattern=".*\S.*"
            required
          />
        </div>

        <div className="flex-card">
          {searchedHacks
            ?.filter((el) => el.category == "HAIR")
            .map((hack) => (
              <HackCard key={hack._id} el={hack} />
            ))}
        </div>
        <Link to="/hack">
          <div className="button">
            <div className="button__line" />
            <div className="button__line" />
            <span className="button__text">Add Hack</span>
            <div className="button__drow1" />
            <div className="button__drow2" />
          </div>
        </Link>
      </section>

      <hr className="hr-hairtip" />

      <section>
        <h2 className="title-section">
          Enjoy watching these beautiful Hair's Tutorials
        </h2>
        <Carousel>
          <Carousel.Item>
            <iframe
              width="700"
              height="315"
              src="https://www.youtube.com/embed/ZU8Xl04-ZIE"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <iframe
              width="700"
              height="315"
              src="https://www.youtube.com/embed/SGxOa6ATbUo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <iframe
              width="700"
              height="315"
              src="https://www.youtube.com/embed/mre5CGX6hPQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <hr className="hr-hairtip" />
      <section>
        <h2 className="title-section">
          Try Out This little Hair Tutorial! 😍😍😍
        </h2>
        <div className="tutorial-card">
          <div className="tutorial-image">
            <img
              src="https://i.ytimg.com/vi/sWJDQIPk0YA/maxresdefault.jpg"
              alt="Tutorial"
            />
          </div>
          <div className="tutorial-content">
            <h3>How to Create the Perfect Beach Waves</h3>
            <p>
              In this tutorial, we'll show you how to create beautiful beach
              waves in your hair using just a curling iron and some hairspray.
              Follow along with our step-by-step instructions and you'll have
              gorgeous waves in no time!
            </p>
            <a
              href="https://www.youtube.com/watch?v=sWJDQIPk0YA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="tutorial-btn">Watch Tutorial</button>
            </a>
          </div>
        </div>
        <div className="tutorial-card">
          <div className="tutorial-image">
            <img
              src="https://static.more.com/wp-content/uploads/2014/12/22182733/easy-french-twist-steps-3-4-820x400.jpg"
              alt="Tutorial"
            />
          </div>
          <div className="tutorial-content">
            <h3>How to Do a French Twist</h3>
            <p>
              The French Twist is a classic and elegant updo that's perfect for
              formal occasions. In this tutorial, we'll show you how to do a
              French Twist step-by-step, so you can achieve this timeless look
              at home.
            </p>
            <a
              href="https://www.youtube.com/watch?v=1c_gHonRtYI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="tutorial-btn">Watch Tutorial</button>
            </a>
          </div>
        </div>
      </section>

      <hr className="hr-hairtip" />
      <section id="cardhack-section">
        <h2 className="title-section">
          Explore Our Collection of Hair Care Products Review
        </h2>

        <div className="input-group">
          <input
            type="search"
            className="form-control search-input"
            id="search"
            placeholder="Search"
            value={queryProduct}
            onChange={(e)=>setQueryProduct(e.target.value)}
            pattern=".*\S.*"
            required
          />
        </div>
        <div className="flex-card">
          {searchedProducts
            .filter((el) => el.category == "HAIR")
            .map((el) => (
              <ProductCard key={el._id} el={el} />
            ))}
        </div>
        <Link to="/productreview">
          <div className="button">
            <div className="button__line" />
            <div className="button__line" />
            <span className="button__text">Add Product</span>
            <div className="button__drow1" />
            <div className="button__drow2" />
          </div>
        </Link>
      </section>
    </div>
  );
}

export default HairCare;
