import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HackCard from "../HackCard/HackCard";
import './MakeUp.css'
import Carousel from 'react-bootstrap/Carousel';
import ProductCard from '../ProductCard/ProductCard';

function MakeUp() {
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
    <section id="mekeup">
    <div id="background-image-makeup" />
    <div id="mekeup-content-area">
      <h1>Unlock the Secrets to Perfect Beauty MakeUp!</h1>
      <h3> You can now add and explore more about MakeUp hacks and Reviewed Products!</h3>
    </div>
  </section>
  <section id="cardhack-section">
    <h2 className="title-section">
      Explore Our Collection of MakeUp Hacks
    </h2>
    <div className="input-group">
          <input
            type="search"
            className="form-control search-input"
            id="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            pattern=".*\S.*"
            required
          />
        </div>
    
    <div className="flex-card">
      {searchedHacks.filter(el=>el.category=="MAKEUP").map((hack) => (
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
      Enjoy watching these beautiful MakeUp's Tutorials
    </h2>
    <Carousel>
      <Carousel.Item>
        <iframe
          width="700"
          height="315"
          src="https://www.youtube.com/embed/H5SW_xMyESI"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <iframe
          width="700"
          height="315"
          src="https://www.youtube.com/embed/cBp51VOW5Pc"
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
          src="https://www.youtube.com/embed/nf8ySuesAPg"
          title="YouTube video player"
          frameborder="0"
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
    Try Out These Makeup Tutorials! 💄💄💄
  </h2>
  <div className="tutorial-card">
    <div className="tutorial-image">
      <img
        src="https://i.ytimg.com/vi/zvlYOkjs_lU/maxresdefault.jpg"
        alt="Tutorial"
      />
    </div>
    <div className="tutorial-content">
      <h3>How to Create a Natural Daytime Makeup Look</h3>
      <p>
        Learn how to create a natural daytime makeup look with this easy-to-follow tutorial. We'll show you step-by-step how to achieve a fresh and glowing complexion, simple eye makeup, and a nude lip.
      </p>
      <a
        href="https://www.youtube.com/watch?v=zvlYOkjs_lU"
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
        src="https://www.byrdie.com/thmb/hw61iQ8vMTXpN0DqPeGMApwXTLE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-05-28at1.19.02PM-b9c92334e493497f91a4585be75b472b.png"
        alt="Tutorial"
      />
    </div>
    <div className="tutorial-content">
      <h3>How to Create a Bold and Dramatic Makeup Look</h3>
      <p>
        Want to turn heads with your makeup? Check out this tutorial on how to create a bold and dramatic makeup look! We'll show you how to do a smoky eye, winged liner, and a bold lip for a show-stopping effect.
      </p>
      <a
        href="https://www.youtube.com/watch?v=OM_diFt8jfs"
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
      Explore Our Collection of MakeUp Products Reviews
    </h2>
    <div className="input-group">
          <input
            type="search"
            className="form-control search-input"
            id="search"
            placeholder="Search"
            value={queryProduct}
            onChange={(e) => setQueryProduct(e.target.value)}
            pattern=".*\S.*"
            required
          />
        </div>
    <div className="flex-card">
      {searchedProducts.filter(el=>el.category=="MAKEUP").map((product) => (
        <ProductCard key={product._id} el={product} />
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

export default MakeUp;
