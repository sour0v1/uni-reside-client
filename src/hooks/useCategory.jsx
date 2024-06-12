import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useCategory = (category) => {
    const axiosPublic = useAxiosPublic();
    const {data : meals} = useQuery({
        queryKey : ['meals'],
        queryFn : async () => {
            const res = await axiosPublic.get(`/meals-by-category?category=${category}`);
            return res.data;
        },
        enabled : !!category
    })
    return {meals};
};

export default useCategory;