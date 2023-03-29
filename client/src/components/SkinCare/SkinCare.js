import React, { useEffect, useState } from 'react'
import './SkinCare.css'
import Carousel from 'react-bootstrap/Carousel';
import ProductCard from '../ProductCard/ProductCard';
import HackCard from '../HackCard/HackCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SkinCare() {
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
  }, [hacks]);

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
  }, [products]);
  return (
    <div>
         <section id="skin">
        <div id="background-skinimg" />
        <div id="skin-content-area">
          <h1>Unlock the Secrets to Perfect Beauty Skin!</h1>
          <h3> You can now add and explore more about Skin hacks and tips!</h3>
        </div>
      </section>

      <section id="cardhack-section">
    <h2 className="title-section">
      Explore Our Collection of SkinCare Hacks
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
      {searchedHacks.filter(el=>el.category=="SKIN").map((hack) => (
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
      Enjoy watching these beautiful SkinCare's Tutorials
    </h2>
    <Carousel>
      <Carousel.Item>
        <iframe
          width="700"
          height="315"
          src="https://www.youtube.com/embed/ilTgzCEjSMg"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <iframe
          width="700"
          height="315"
          src="https://www.youtube.com/embed/cyMPtZwXCXA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <iframe
          width="700"
          height="315"
          src="https://www.youtube.com/embed/TM6sLq3B8HI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </section>

  <hr className="hr-hairtip" />

  <section>
  <h2 className="title-section">
  Try Out These Skincare Tutorials! 🧖‍♀️🧖‍♀️🧖‍♀️
  </h2>
  <div className="tutorial-card">
    <div className="tutorial-image">
      <img
        src="https://i.ytimg.com/vi/CXlIxWB9ymg/maxresdefault.jpg"
        alt="Tutorial"
      />
    </div>
    <div className="tutorial-content">
      <h3>How to Create the Best Skin Care Routine</h3>
      <p>
      Creating the best skincare routine can be overwhelming, but with the right tips and guidance, it can be a simple and enjoyable process. In this tutorial, you'll learn the essential steps to create an effective skincare routine that caters to your skin's unique needs. 
      </p>
      <a
        href="https://www.youtube.com/watch?v=CXlIxWB9ymg"
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
        src="https://i.ytimg.com/vi/JjT6AMKeQ54/maxresdefault.jpg"
        alt="Tutorial"
      />
    </div>
    <div className="tutorial-content">
      <h3>REVOLUTION | RELAXING & CALMING SKINCARE TUTORIAL - DRY/COMBINATION SKIN</h3>
      <p>
      If you're someone with dry or combination skin who's looking for a relaxing and calming skincare routine, then this tutorial is perfect for you. 
      </p>
      <a
        href="https://www.youtube.com/watch?v=JjT6AMKeQ54"
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
      Explore Our Collection of SkinCare Products Review
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
      {searchedProducts.filter(el=>el.category=="SKIN").map((product) => (
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
  )
}

export default SkinCare