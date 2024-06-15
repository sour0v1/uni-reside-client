
import Banner from "./banner/Banner";
import MealCategory from "./mealCategory/MealCategory";
import Membership from "./membership/Membership";
import Testimonials from "./testimonials/Testimonials";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealCategory></MealCategory>
            <Membership></Membership>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;