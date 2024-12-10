/* eslint-disable no-irregular-whitespace */
import  { useEffect } from "react";
import "./Para.css";

const Para = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <>
      <div className="head animate-on-scroll">
        <h1>About Us</h1>
      </div>
      <div className="para animate-on-scroll">
        <p className="py-6">
        Welcome to BrandSpark, where creativity meets strategy! We are a full-service digital advertising agency fueled by innovation, results, and a passion for building memorable brands. At BrandSpark, we believe in more than just advertising; we believe in creating experiences that connect brands with their audience in impactful and meaningful ways.
<br /><br />
Our team of experts brings a mix of creativity, data-driven insights, and digital expertise to every project, making each campaign a unique success story. From captivating content and precision-targeted ads to insightful analytics and immersive digital experiences, we’re here to help your brand shine.
<br /><br />
With a commitment to excellence and a relentless focus on growth, BrandSpark is dedicated to lighting the way for businesses of all sizes, empowering them to achieve their digital marketing goals. Let&apos;s ignite your brand’s potential!
        </p>
      </div>
    </>
  );
};

export default Para;
