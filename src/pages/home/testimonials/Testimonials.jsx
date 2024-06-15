import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Marquee from 'react-fast-marquee';

const Testimonials = () => {
    const axiosSecure = useAxiosSecure();
    const {data : testimonials} = useQuery({
        queryKey : ['testimonials'],
        queryFn : async () => {
            const res = await axiosSecure.get('/testimonials');
            return res.data;
        }
    })
    console.log(testimonials);
    return (
        <div className='mb-12 max-w-5xl mx-auto font-roboto'>
            <h2 className='text-center text-2xl font-bold my-6'>What Students Say</h2>

            <Marquee className='flex justify-center items-center '>
                {
                    testimonials?.map(testimonial => <div className='bg-gray-100 p-9 border mx-4 w-[400px] h-full' key={testimonial._id}>
                        <p className='h-[200px] my-auto'>{testimonial?.testimonial}</p>
                        <div>
                            <h2 className='font-medium'>{testimonial?.name}</h2>
                            <p>{testimonial?.background}</p>
                        </div>
                    </div>)
                }
                
            </Marquee>
        </div>
    );
};

export default Testimonials;