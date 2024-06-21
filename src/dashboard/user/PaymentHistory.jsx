import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Heading from '../../components/Heading';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: payments } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-payment-history?userEmail=${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    // console.log(payments);
    return (
        <div className='px-6'>
            <Heading title={'Payment History'}></Heading>
            {
                payments?.length > 0 ?
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
                    </div> :
                    <div className='w-full text-center'>
                        <h1 className='text-2xl'>You have no payment history yet.</h1>
                    </div>
            }
        </div>
    );
};

export default PaymentHistory;