// import Banner from "./home_components/Banner";

import Banner from "./banner/Banner";
import MealsByCategory from "./mealsByCategory/MealsByCategory";
import Membership from "./membership/Membership";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Membership></Membership>
            <MealsByCategory></MealsByCategory>
        </div>
    );
};

export default Home;