import { Swiper, SwiperSlide } from 'swiper/react';
import '../banner/Banner.css'
import banner1 from '../../../assets/images/banner/banner1.jpg'
import banner2 from '../../../assets/images/banner/banner2.jpg'
import banner3 from '../../../assets/images/banner/banner3.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';
import { Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
  return (
    <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        onAutoplay={true}
      >
        <SwiperSlide>
          <div className='h-[600px] bg-cover bg-center' style={{backgroundImage : `url(${banner1})`}}>
          {/* <img className='w-full h-full' src={banner1} alt="" /> */}
          <div className='bg-black w-full h-full bg-opacity-40'>
            
          </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-[600px] bg-cover bg-center' style={{backgroundImage : `url(${banner2})`}}>
          {/* <img className='w-full h-full' src={banner1} alt="" /> */}
          <div className='bg-black w-full h-full bg-opacity-40'></div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
        <img className='h-[600px] w-full' src={banner2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='h-[600px] w-full' src={banner3} alt="" />
        </SwiperSlide> */}
        
        
      </Swiper>
  );
};

export default Banner;