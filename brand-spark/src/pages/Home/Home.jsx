
import Homemain from "../../components/Home/Homemain";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import { useEffect } from "react";

const Home = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="home">
      <Homemain />
      <About />
      <Services />
      <Portfolio />
    </div>
  );
};

export default Home;
