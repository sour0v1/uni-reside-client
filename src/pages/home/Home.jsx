
import { Helmet } from "react-helmet-async";
import Banner from "./banner/Banner";
import MealCategory from "./mealCategory/MealCategory";
import Membership from "./membership/Membership";
import Testimonials from "./testimonials/Testimonials";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>UniReside | Home</title>
            </Helmet>
            <Banner></Banner>
            <MealCategory></MealCategory>
            <Membership></Membership>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;