import  { useEffect } from "react";
import Contact from "../../components/Contact/Contact";

const ContactPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <Contact />
    </>
  );
};

export default ContactPage;
