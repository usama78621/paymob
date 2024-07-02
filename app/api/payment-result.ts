// pages/api/payment-result.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { status, transaction_id, amount } = req.query;
console.log('dsjkrgnjkadrjnjrjnjrj')
    // Handle the transaction result based on the status and other parameters
    let message = '';
    if (status === 'success') {
        message = 'Your payment was successful!';
    } else if (status === 'failed') {
        message = 'Your payment failed. Please try again.';
    } else {
        message = 'Payment status is unclear. Please contact support.';
    }

    res.status(200).json({
        message,
        transaction_id,
        amount,
    });
}
