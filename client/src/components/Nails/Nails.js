import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HackCard from "../HackCard/HackCard";
import "./Nails.css";
import Carousel from "react-bootstrap/Carousel";
import ProductCard from "../ProductCard/ProductCard";

function Nails() {
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
      <section id="nail">
        <div id="background-image-nail" />
        <div id="nail-content-area">
          <h1>Unlock the Secrets to Perfect Beauty Nails!</h1>
          <h3>
            You can now add and explore more about Nail care hacks and Reviewed
            Products!
          </h3>
        </div>
      </section>
      <section id="cardhack-section">
        <h2 className="title-section">
          Explore Our Collection of Nail Care Hacks
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
          {searchedHacks
            .filter((el) => el.category === "NAILS")
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
          Enjoy watching these beautiful Nails's Tutorials
        </h2>
        <Carousel>
          <Carousel.Item>
            <iframe
              width="700"
              height="315"
              src="https://www.youtube.com/embed/ZBwB9OKyJQM"
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
              src="https://www.youtube.com/embed/cMO6z6SIvBc"
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
              src="https://www.youtube.com/embed/vMdAtBDkI-8"
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
        <h2 className="title-section">Try Out These Nail Tutorials! 💅💅💅</h2>
        <div className="tutorial-card">
          <div className="tutorial-image">
            <img
              src="https://publish.purewow.net/wp-content/uploads/sites/2/2020/04/manicure-guide-universal.jpg?fit=2050%2C1100"
              alt="Tutorial"
            />
          </div>
          <div className="tutorial-content">
            <h3>How to Do a Basic Manicure at Home</h3>
            <p>
              Learn how to do a basic manicure at home with this easy-to-follow
              tutorial. We'll show you step-by-step how to clean, shape, and
              polish your nails to perfection.
            </p>
            <a
              href="https://www.youtube.com/watch?v=_jousbAJEbU"
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
              src="https://naildesignsjournal.com/wp-content/uploads/2022/01/tp-minimalist-nail-art.jpg"
              alt="Tutorial"
            />
          </div>
          <div className="tutorial-content">
            <h3>How to Create Easy Nail Art</h3>
            <p>
              Want to add some fun and creativity to your nails? Check out this
              tutorial on easy nail art! We'll show you how to create cute and
              simple designs using just a few tools and some nail polish.
            </p>
            <a
              href="https://www.youtube.com/watch?v=ElL895fr_Jg"
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
          Explore Our Collection of Nail Care Products Review
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
          {searchedProducts
            .filter((el) => el.category === "NAILS")
            .map((product) => (
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

export default Nails;
