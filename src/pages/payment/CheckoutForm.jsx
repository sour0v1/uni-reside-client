import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import moment from 'moment';

const CheckoutForm = () => {
    const { user } = useContext(AuthContext);
    const { membership } = useParams();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    // console.log(membership);

    const { data } = useQuery({
        queryKey: ['membership'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/membership?membership=${membership}`)
            return res.data;
        },
        enabled: !!membership
    })
    // console.log(data);
    // console.log('secret -',clientSecret);

    useEffect(() => {
        const getClientSecret = async () => {
            const res = await axiosSecure.post(`/create-payment-intent?price=${data?.price}`)
            setClientSecret(res.data?.clientSecret);
        }
        getClientSecret();
    }, [axiosSecure, data?.price])
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            // console.log('error -', error);
            setError(error.message);

        }
        else {
            // console.log('paymentMethod -', paymentMethod);
            setError(null);
        }
        // confirm card payment
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        })
            .then(async (result) => {
                // console.log('confirm payment -', result);
                if (result.paymentIntent.status === 'succeeded') {
                    const paymentInfo = {
                        email: user?.email,
                        date: moment().format('MMM DD, YYYY, h:mm:ss A'),
                        price: data?.price,
                        transactionId: result.paymentIntent.id,
                        badge: data?.package
                    }
                    const res = await axiosSecure.post('/payment-history', paymentInfo)
                    // console.log(res.data);
                    const userRes = await axiosSecure.patch(`/update-user?email=${user?.email}&updatedBadge=${data?.package}`)
                    // console.log(userRes.data);
                    Swal.fire({
                        title: "Success!",
                        text: "Successful Payment",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                // console.log(error);
            })
    }
    return (
        <form className='lg:w-1/3 mx-6 flex flex-col justify-center items-center gap-3 shadow-lg p-9 lg:mx-auto font-roboto mb-9' onSubmit={handleSubmit}>
            <div>
                <p><span className='font-medium'>Membership : {data?.package}</span></p>
                <p><span className='font-medium'>Price : {data?.price}$</span></p>
            </div>
            <div style={{ backgroundColor: '#F2F2F2', padding: '10px', borderRadius: '5px', width: '100%' }}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                                backgroundColor: '#F2F2F2',
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <button className='btn btn-warning' type="submit" disabled={!stripe && !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;