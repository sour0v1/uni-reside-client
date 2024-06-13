import React from 'react';
import { IoIosStarOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const MealCard = ({ meal }) => {
    const { image, title, price, category, rating, _id } = meal;
    return (
        <div className='h-[300px] bg-cover bg-center font-roboto' style={{ backgroundImage: `url(${image})` }}>
            <div className='h-full w-full flex flex-col justify-between bg-black bg-opacity-10 hover:bg-opacity-30'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className='flex justify-center items-center py-1 bg-opacity-30 text-white px-2 opacity-80 text-2xl bg-black mx-2 my-2'>
                        <span >{rating}</span>
                        <span><IoIosStarOutline /></span>
                    </h2>
                    <h2 className='py-3 px-2 opacity-100 text-2xl'><span className='bg-black bg-opacity-30 text-white opacity-80 px-1 py-1'>${price}</span></h2>
                </div>
                <div className='bg-black bg-opacity-40 py-3 px-2 flex justify-between items-center gap-6'>
                    <div className='flex flex-col justify-center text-sm text-white opacity-90'>
                        <h2 className='text-xl font-bold text-white opacity-90'>{title}</h2>
                        <p>For <span className='underline'>{category}</span></p>
                    </div>
                    <Link to={`/meal/${_id}`} className='bg-white bg-opacity-50 hover:bg-opacity-60 py-1 px-2 font-medium'>Details</Link>
                </div>
            </div>
        </div>
    );
};

export default MealCard;