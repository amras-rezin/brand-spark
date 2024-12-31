import { motion } from "framer-motion";
import "./Home.css";
import { useEffect, useState } from "react";
import { axiosAdmin } from "../../axios/axiosAdmin";


const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const Homemain = () => {
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchVideo();
  },[])
  const fetchVideo = async () => {
    try {
      const {data} = await axiosAdmin().get('/getSelectedVideo');
      console.log(data)
      setVideo(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
    className="home-div w-full flex justify-center items-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    {loading ? (
      <div>Loading video...</div>
    ) : video.filePath ? (
      <video className="video" autoPlay loop muted>
        <source
          src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${video.filePath}`}
          type="video/mp4"
        />
      </video>
    ) : (
      <div>Video not available</div>
    )}
  </motion.div>
  );
};

export default Homemain;
