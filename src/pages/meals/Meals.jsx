import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoFilterOutline, IoSearch, IoSearchOutline } from "react-icons/io5";
import MealCard from "../../components/MealCard";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";


const Meals = () => {
    const axiosPublic = useAxiosPublic();
    const [meals, setMeals] = useState([]);
    const [meals1, setMeals1] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [filter, setFilter] = useState(false);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    console.log('svalue - ', meals)

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
        <InfiniteScroll
            dataLength={meals?.length} //This is important field to render the next data
            next={loadMeals}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-roboto">
                {
                    meals?.map((meal, idx) => <div key={idx} className=" bg-base-100 shadow-xl">
                        <figure><img className="h-[200px]" src={meal?.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <h2 className="card-title">{meal?.title}</h2>
                                <h2 className="card-title">${meal?.price}</h2>
                            </div>
                            <p>Category : {meal?.category}</p>
                            <p>Rating : {meal?.rating}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/meal/${meal?._id}`} className="btn">View</Link >
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </InfiniteScroll>
    )
};

export default Meals;