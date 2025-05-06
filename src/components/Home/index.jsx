import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import Newsletter from "../Common/Newsletter";

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      <PromoBanner />
      <Newsletter />
    </main>
  );
};

export default Home;
