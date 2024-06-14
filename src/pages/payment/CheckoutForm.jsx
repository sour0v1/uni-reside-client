import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';

const CheckoutForm = () => {
    const {user} = useContext(AuthContext);
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
        enabled : !!membership
    })
    // console.log(data);
    console.log('secret -',clientSecret);

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
            console.log('error -', error);
            setError(error.message);

        }
        else {
            console.log('paymentMethod -', paymentMethod);
            setError(null);
        }
        // confirm card payment
        stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card : card,
                billing_details : {
                    name : user?.displayName,
                    email : user?.email
                }
            }
        })
        .then(result => {
            console.log('confirm payment -',result);
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <form className='w-1/3 flex flex-col justify-center items-center gap-3 shadow-lg p-9 mx-auto font-roboto mb-9' onSubmit={handleSubmit}>
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
            <button className='btn btn-warning' type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;