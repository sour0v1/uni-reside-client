import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoFilterOutline, IoFilterSharp, IoSearch, IoSearchOutline } from "react-icons/io5";
import MealCard from "../../components/MealCard";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import { MdSort } from "react-icons/md";


const Meals = () => {
    const axiosPublic = useAxiosPublic();
    const [meals, setMeals] = useState([]);
    const [meals1, setMeals1] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [filter, setFilter] = useState(false);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    console.log('svalue - ', meals)
    console.log('svalue1 - ', meals1)

    const loadMeals = async () => {
        const res = await axiosPublic.get(`/all-category-meals?page=${page}&limit=${10}`)
        setMeals(prevMeals => [...prevMeals, ...res.data.result]);
        setHasMore(res.data.hasMore)
        setPage(prevPage => prevPage + 1)
    }

    useEffect(() => {
        loadMeals();
    }, [])

    const handleSearch = async (event) => {
        const searchQuery = event.target.value;
        setSearchValue(searchQuery);
        console.log(searchQuery);
        const res = await axiosPublic.get(`/search-meals/${searchQuery}`)
        console.log('err', res.data);
        // setMeals(res.data);
        setMeals(res.data);

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
            const filterSearchValue = meals.filter(value => filterValue === value.category);
            console.log('ddd', filterSearchValue)
            setMeals(filterSearchValue);
        }

    }
    const handlePriceFilter = async (event) => {
        const filterValue = event.target.value;
        // console.log(filterValue);
        const res = await axiosPublic.get(`/filter-by-price?priceValue=${filterValue}`)
        console.log(res.data);
        setMeals(res.data);
    }
    const handleFilter = () => {
        setFilter(!filter);
    }
    return (
        <InfiniteScroll
            dataLength={meals?.length} //This is important field to render the next data
            next={loadMeals}
            hasMore={hasMore}
            loader={<h4 className="text-center">Loading...</h4>}
        >
            <div className="max-w-5xl mx-auto font-roboto pt-24 mb-9">
                <h1 className="w-full text-center text-2xl font-bold">All Meals</h1>
                <div className="w-2/3 mx-auto my-6 text-center relative">
                    <input onChange={handleSearch} placeholder="meal name" className="py-2 px-3 w-full bg-gray-200 rounded-full outline-none" type="text" />
                    <span className="absolute text-xl right-3 top-2 opacity-90 "><IoSearchOutline /></span>
                </div>
                <div className="w-full flex justify-end my-3">
                    <button onClick={handleFilter} className="btn flex justify-center items-center gap-2">
                        <span className="text-xl"><IoFilterSharp /></span>
                        <span>Filter</span>
                    </button>

                </div>
                {
                    filter && <div className="flex justify-center items-center gap-6 mb-3">
                        <div>
                            <select className="py-3 px-3 border w-fit outline-none hover:bg-gray-100" onChange={handleCategoryFilter}>
                                <option value="category">Filter By Category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>
                        <div>
                            <select className="py-3 px-3 border w-fit outline-none hover:bg-gray-100" onChange={handlePriceFilter}>
                                <option value="category">Filter By Price</option>
                                <option value="first">0 - 20$</option>
                                <option value="second">20 - 40</option>
                                <option value="third">40 - 80</option>
                                <option value="fourth">80 up</option>
                            </select>
                        </div>
                    </div>
                }
                {
                    meals.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                (meals)?.map((meal, idx) => <MealCard key={idx} meal={meal}></MealCard>)
                            }
                        </div> :
                        <div className="w-full text-center font-roboto">   
                            <h2 className="text-2xl font-bold">No meals Found</h2>
                        </div>
                }
            </div>

        </InfiniteScroll>
    )
};

export default Meals;