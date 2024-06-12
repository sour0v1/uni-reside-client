
import Banner from "./banner/Banner";
import MealCategory from "./mealCategory/MealCategory";
import Membership from "./membership/Membership";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Membership></Membership>
            <MealCategory></MealCategory>
        </div>
    );
};

export default Home;