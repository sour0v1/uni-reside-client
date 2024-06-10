// import React from 'react';
// import MealsCard from '../pages/home/mealsByCategory/MealsCard';

// const MealCategoryCards = ({mealCategoryData, maxLength}) => {
//     return (
//         <div className={'flex justify-center items-center'}>
//             <div className='grid grid-cols-3 gap-6'>
//                 {
//                   maxLength ?  mealCategoryData.slice(0, maxLength).map(meal => <MealsCard meal={meal} key={meal._id}></MealsCard>):
//                   mealCategoryData.map(meal => <MealsCard meal={meal} key={meal._id}></MealsCard>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default MealCategoryCards;