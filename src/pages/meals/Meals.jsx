import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoSearchOutline } from "react-icons/io5";
import MealCard from "../../components/MealCard";
import { useState } from "react";


const Meals = () => {
    const axiosPublic = useAxiosPublic();
    const [searchedMeal, setSearchedMeal] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const {data : meals = []} = useQuery({
        queryKey : ['meal'],
        queryFn : async () => {
            const res = await axiosPublic.get('/all-category-meals')
            return res.data;
        },
    })
    const handleSearch = async (event) =>{
        const searchQuery = event.target.value;
        setSearchValue(searchQuery);
        console.log(searchQuery);
        const res = await axiosPublic.get(`/search-meals/${searchQuery}`)
        console.log(res.data);
        setSearchedMeal(res.data);
    }
    console.log(meals);
    return(
        <div className="max-w-5xl mx-auto py-24">
            <h1 className="text-center text-2xl font-bold mb-9">Meals</h1>
            <div className="mb-9">
                <input onChange={handleSearch} className="w-2/3 py-3 px-3 bg-gray-200" type="text" />
                <button className="py-3 px-2 text-white bg-[#151515] bg-opacity-90 hover:bg-opacity-100">Search</button>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
                {
                  !searchValue ? meals.map(meal => <MealCard meal={meal} key={meal._id}></MealCard>):
                  searchedMeal.map(meal => <MealCard meal={meal} key={meal._id}></MealCard>)
                }
            </div>
        </div>
    )
};

export default Meals;