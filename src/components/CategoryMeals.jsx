import React from 'react';
import useCategory from '../hooks/useCategory';
import MealCard from './MealCard';
import { Link } from 'react-router-dom';

const CategoryMeals = ({ mealCategory }) => {
    const { meals } = useCategory(mealCategory)
    // const { image, title, price, category } = meals;
    return (
        <>
            {!mealCategory === 'all' ?
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 lg:p-0 gap-9">
                    {
                        meals?.slice(0, 6).map(meal => <MealCard meal={meal} key={meal._id}></MealCard>)
                    }
                </div> :
                <div>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-9 lg:p-0 gap-6">
                        {
                            meals?.slice(0, 6).map(meal => <MealCard meal={meal} key={meal._id}></MealCard>)
                        }
                    </div>
                    <div className='w-full flex justify-center items-center my-3 '>
                        <Link to={'/meals'} className={`${mealCategory !== 'all' && 'hidden'} border-b-2 rounded-b-xl px-3 hover:border-black hover:border-opacity-80`}>View More</Link>
                    </div>
                </div>
            }
        </>
    );
};

export default CategoryMeals;