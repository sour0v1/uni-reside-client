import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoFilterOutline, IoSearch, IoSearchOutline } from "react-icons/io5";
import MealCard from "../../components/MealCard";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';


const Meals = () => {
    const axiosPublic = useAxiosPublic();
    const [meals, setMeals] = useState([]);
    const [meals1, setMeals1] = useState([]);
    const [page, setPage] = useState(1)
    const [searchValue, setSearchValue] = useState(null);
    const [filter, setFilter] = useState(false);
    console.log('svalue - ', meals)

    useEffect(() => {
        const allMeals = async(pageNo) => {
            const res = await axiosPublic.get(`/all-category-meals?page=${pageNo}&limit=3`)
            console.log(res.data);
            setMeals(res.data);
        }
        allMeals(page);
    }, [axiosPublic, page])
   
    const handleSearch = async (event) => {
        const searchQuery = event.target.value;
        setSearchValue(searchQuery);
        console.log(searchQuery);
        const res = await axiosPublic.get(`/search-meals/${searchQuery}`)
        console.log(res.data);
        setMeals(res.data);
        setMeals1(res.data);

    }
    // console.log(meals);
    const handleCategoryFilter = async (event) => {
        const filterValue = event.target.value;
        console.log(filterValue);
        if (!searchValue) {
            const res = await axiosPublic.get(`/filter-by-category/${filterValue}`)
            console.log(res.data);
            setMeals(res.data);
        }
        if (searchValue) {
            const filterSearchValue = meals1.filter(value => filterValue === value.category);
            console.log('ddd', filterSearchValue)
            setMeals(filterSearchValue);
        }

    }
    return (
        <div className="max-w-5xl mx-auto py-24 font-roboto">
            <h1 className="text-center text-2xl font-bold mb-9">Meals</h1>
            <div className="mb-9 flex justify-center items-center relative w-2/3 mx-auto">
                <input onChange={handleSearch} className="w-full py-3 px-3 bg-gray-200 rounded-full" type="text" placeholder="pizza" />
                <span className="text-xl absolute top right-4 opacity-80"><IoSearch /></span>
            </div>
            <div className="mb-6 flex justify-end">
                <button onClick={() => setFilter(!filter)} className="border hover:border-black hover:border-opacity-70 py-3 px-4 flex justify-center items-center gap-2">
                    <span><IoFilterOutline /></span>
                    <span>Filter</span>
                </button>
            </div>
            {
                filter &&
                <div className="flex justify-center items-center gap-9">
                    <div className="mb-6 flex justify-end">
                        <select onChange={handleCategoryFilter} className="bg-gray-200 py-3 px-2 border-2 border-opacity-80 " name="" id="">
                            <option value="category">Category</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                    </div>
                    <div className="mb-6 flex justify-end">
                        <select className="bg-gray-200 py-3 px-2 border-2 border-opacity-80" name="" id="">
                            <option value="filter">Price($)</option>
                            <option value="category">0 - 20</option>
                            <option value="">20 - 40</option>
                            <option value="">40 up</option>
                        </select>
                    </div>
                </div>
            }
            {/* <InfiniteScroll
                pageStart={0}
                loadMore={fetchData}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                
            </InfiniteScroll> */}
            <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
                {
                    !meals?.length > 0 ? <p className="text text-4xl">Not found</p> :
                        meals.map(meal => <MealCard meal={meal} key={meal._id}></MealCard>)
                }
            </div>

        </div>
    )
};

export default Meals;