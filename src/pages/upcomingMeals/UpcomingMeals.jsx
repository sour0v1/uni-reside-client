import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);

    const {data : upComingMeals} = useQuery({
        queryKey : ['meals'],
        queryFn : async () => {
            const res = await axiosPublic.get(`/upcoming-meals?page=${page}&limit=${10}`)
            return res.data;
        }
    })
    console.log(upComingMeals);
    return (
        <div>
            <h1>Upcoming Meal Page</h1>
        </div>
    );
};

export default UpcomingMeals;