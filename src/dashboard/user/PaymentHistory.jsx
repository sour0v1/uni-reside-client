import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';

const PaymentHistory = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data : payments} = useQuery({
        queryKey : ['payments'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/get-payment-history?userEmail=${user?.email}`)
            return res.data;
        },
        enabled : !!user?.email
    })
    console.log(payments);
    return (
        <div className='px-6'>
            <h1 className='text-2xl mb-6 text-center'>Payment history</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Package</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments?.map((payment, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{payment?.badge}</td>
                                <td>{payment?.price}</td>
                                <td>{payment?.transactionId}</td>
                                <td>{payment?.date}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;