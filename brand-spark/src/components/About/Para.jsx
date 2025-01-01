/* eslint-disable no-irregular-whitespace */
import { motion } from "framer-motion";
import "./Para.css";

const Para = () => {
  return (
    <>
      {/* Heading with slide-up animation */}
      <div className="head1 mt-6">
        <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        viewport={{ once: true, amount: 0.2 }}
        >
          About Us
        </motion.h1>
      </div>

      {/* Paragraph with delayed slide-up animation */}
      <div className="para">
        <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          delay: 0.3, // Delay for smoother sequential animation
        }}
        viewport={{ once: true, amount: 0.2 }}>
          Welcome to BrandSpark, where creativity meets strategy! We are a
          full-service digital advertising agency fueled by innovation,
          results, and a passion for building memorable brands. At BrandSpark,
          we believe in more than just advertising; we believe in creating
          experiences that connect brands with their audience in impactful and
          meaningful ways.
          <br />
          <br />
          Our team of experts brings a mix of creativity, data-driven insights,
          and digital expertise to every project, making each campaign a unique
          success story. From captivating content and precision-targeted ads to
          insightful analytics and immersive digital experiences, we’re here to
          help your brand shine.
          <br />
          <br />
          With a commitment to excellence and a relentless focus on growth,
          BrandSpark is dedicated to lighting the way for businesses of all
          sizes, empowering them to achieve their digital marketing goals.
          Let&apos;s ignite your brand’s potential!
        </motion.p>
      </div>
    </>
  );
};

export default Para;
