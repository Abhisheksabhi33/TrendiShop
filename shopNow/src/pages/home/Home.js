import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import { Product } from "../../components/product/Product";

const Home = () => {
  const url = window.location.href;


  useEffect(() => {    
  const scrollToProduct = () => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 870,
        behavior: "smooth",
      });

      return;
    }
  }; 
    scrollToProduct();
  }, [url]);

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
