// pages/payment-result.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PaymentResult() {
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

    return (
        <div>
            <h1>{message}</h1>
            {transaction_id && <p>Transaction ID: {transaction_id}</p>}
            {amount && <p>Amount: {amount}</p>}
        </div>
    );
}
