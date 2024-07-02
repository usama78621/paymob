"use client";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PaymentResult = () => {
    const router = useRouter();
    const { status, transaction_id, amount } = router.query;
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (router.isReady) {
            fetch(`/api/payment-result?status=${status}&transaction_id=${transaction_id}&amount=${amount}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data, 'klfaseknfnjsjn')
                    setMessage(data.message);
                });
        }
    }, [router.isReady, status, transaction_id, amount]);

    if (!router.isReady) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{message}</h1>
            {transaction_id && <p>Transaction ID: {transaction_id}</p>}
            {amount && <p>Amount: {amount}</p>}
        </div>
    );
};

// Dynamically import the component to ensure client-side rendering
export default dynamic(() => Promise.resolve(PaymentResult), { ssr: false });
