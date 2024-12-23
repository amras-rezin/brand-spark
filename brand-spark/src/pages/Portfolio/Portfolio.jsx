
import { useEffect } from "react";
import OurWorks from "../../components/Portfolio/OurWorks";

const Portfolio = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
      <OurWorks />
    </>
  );
};

export default Portfolio;
