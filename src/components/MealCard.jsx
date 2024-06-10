import React from 'react';

const MealCard = ({ meal }) => {
    const { image, title, price, category } = meal;
    return (
        <div className='h-[300px] bg-cover bg-center font-roboto' style={{ backgroundImage: `url(${image})` }}>
            <div className='h-full w-full flex flex-col justify-between bg-black bg-opacity-10 hover:bg-opacity-30'>
                <h2 className='w-full flex justify-end py-3 px-2 opacity-100 text-2xl'><span className='bg-black bg-opacity-30 text-white opacity-90 px-1 py-1'>${price}</span></h2>
                <div className='bg-black bg-opacity-40 py-3 px-2 flex justify-between items-center gap-6'>
                    <div className='flex flex-col justify-center text-sm text-white opacity-90'>
                        <h2 className='text-xl font-bold text-white opacity-90'>{title}</h2>
                        <p>For <span className='underline'>{category}</span></p>
                    </div>
                    <button className='bg-white bg-opacity-50 hover:bg-opacity-60 py-1 px-2 font-medium'>Details</button>
                </div>
            </div>
        </div>
    );
};

export default MealCard;