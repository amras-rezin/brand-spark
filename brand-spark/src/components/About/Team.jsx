import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import './Team.css'
import 'swiper/css';
import 'swiper/css/effect-coverflow';  // Import coverflow effect styles

const teamMembers = [
  { image: './Team/Abby.png' },
  { image: './Team/Cherian.png' },
  { image: './Team/Rohit.png' },
  { image: './Team/Gayathry.png' },
  { image: './Team/Induchoodan.png' },
  { image: './Team/Joel.png' },
];

const Team = () => {
  return (
    <div className="bg-custom-gradient py-10 px-5">
     <div className="head">
        <h1>Our Team</h1>
      </div>

      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={3000}
        spaceBetween={20}
        freeMode={true}
        loop={true}
        effect="coverflow"  
        coverflowEffect={{
          rotate: 100,  // Rotate the slides
          stretch: 0,  // Control spacing between slides
          depth: 100,  // Depth of the slides
          modifier: 1,  // Scale modifier
          slideShadows: true,  // Add slide shadows for 3D effect
        }}
        breakpoints={{
          960: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          720: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
        className="w-full max-w-4xl mx-auto"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center slides">
              <img
                src={member.image}
                alt={`Team member ${index + 1}`}
                className="w-82 h-82 rounded-lg object-cover shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Team;
