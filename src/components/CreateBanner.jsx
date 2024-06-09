import React from 'react';

const CreateBanner = () => {
    return (
        // TODO : create this
        <div className="h-[550px] bg-cover bg-center font-roboto" style={{ backgroundImage: `url(${h2})` }}>
            <div className="w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center gap-6">
                <h2 className="text-5xl font-bold text-white">Comfortable Living for <br /> University Students</h2>
                <p className="text-white text-xl">Experience the best in student accommodation services</p>
                <div className="relative w-1/2">
                    <input type="text" className="py-2 px-4 outline-none bg-white rounded-full w-full" placeholder="Search..." />
                    <span className="absolute top-3 right-5"><IoSearchOutline /></span>
                </div>
            </div>
        </div>
    );
};

export default CreateBanner;