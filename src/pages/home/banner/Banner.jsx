import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import h1 from '../../../assets/images/banner/h1.jpg'
import h2 from '../../../assets/images/banner/h2.jpg'
import h3 from '../../../assets/images/banner/h3.jpg'
import h4 from '../../../assets/images/banner/h4.jpg'
import { IoSearchOutline } from "react-icons/io5";

const Banner = () => {
    return (
        <Carousel showArrows={false} showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={true} transitionTime={1000}>
            {/* 1 */}
            <div className="h-[550px] bg-cover bg-center font-roboto" style={{ backgroundImage: `url(${h4})` }}>
                <div className="w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center gap-6">
                    <h2 className="text-5xl font-bold text-white">Comfortable Living for <br /> University Students</h2>
                    <p className="text-white text-xl">Experience the best in student accommodation services</p>
                    <div className="relative w-1/2">
                        <input type="text" className="py-2 px-4 outline-none bg-white rounded-full w-full" placeholder="Search..." />
                        <span className="absolute top-3 right-5"><IoSearchOutline /></span>
                    </div>
                </div>
            </div>
            {/* 2 */}
            <div className="h-[550px] bg-cover bg-center font-roboto" style={{ backgroundImage: `url(${h2})` }}>
                <div className="w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center gap-6">
                    <h2 className="text-5xl font-bold text-white">Comfortable University <br /> Housing Solutions</h2>
                    <p className="text-white text-xl">Providing safe, comfortable, and convenient university housing.</p>
                    <div className="relative w-1/2">
                        <input type="text" className="py-2 px-4 outline-none bg-white rounded-full w-full" placeholder="Search..." />
                        <span className="absolute top-3 right-5"><IoSearchOutline /></span>
                    </div>
                </div>
            </div>
            {/* 3 */}
            <div className="h-[550px] bg-cover bg-center font-roboto" style={{ backgroundImage: `url(${h3})` }}>
                <div className="w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center gap-6">
                    <h2 className="text-5xl font-bold text-white">Safe and Modern <br /> Student Living</h2>
                    <p className="text-white text-xl">Premium living spaces designed for student success</p>
                    <div className="relative w-1/2">
                        <input type="text" className="py-2 px-4 outline-none bg-white rounded-full w-full" placeholder="Search..." />
                        <span className="absolute top-3 right-5"><IoSearchOutline /></span>
                    </div>
                </div>
            </div>
            {/* 4 */}
            <div className="h-[550px] bg-cover bg-center font-roboto" style={{ backgroundImage: `url(${h1})` }}>
                <div className="w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center gap-6">
                    <h2 className="text-5xl font-bold text-white">Your Premier Campus <br /> Living Choice</h2>
                    <p className="text-white text-xl">Modern amenities for a hassle-free student life</p>
                    <div className="relative w-1/2">
                        <input type="text" className="py-2 px-4 outline-none bg-white rounded-full w-full" placeholder="Search..." />
                        <span className="absolute top-3 right-5"><IoSearchOutline /></span>
                    </div>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;