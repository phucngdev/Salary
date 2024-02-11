import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import banner from "../../public/banner.jpeg";
import { CSSTransition } from "react-transition-group";
import "../assets/Home.css";

const Home = () => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CSSTransition
        in={showImage}
        timeout={1000}
        classNames="slide-up"
        unmountOnExit
      >
        <img
          src={banner}
          alt="banner"
          className="fixed top-0 left-0 bottom-0 right-0 z-[99] w-full h-full object-cover"
        />
      </CSSTransition>
      <Header></Header>
    </>
  );
};

export default Home;
