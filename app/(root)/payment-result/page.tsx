// app/payment-result/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateOrderToPaid } from '@/lib/actions/order.actions';

interface QueryParams {
  id?: string;
  pending?: string;
  amount_cents?: string;
  success?: string;
  order?: string;
  'data.message'?: string;
  email_address?: string; // Optional: If you might get email_address from the URL params
}

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParams | null>(null);

  useEffect(() => {
    const params: QueryParams = {};
    searchParams.forEach((value, key) => {
      params[key as keyof QueryParams] = value;
    });
    setQueryParams(params);
  }, [searchParams]);

  useEffect(() => {
    if (queryParams && queryParams.order) {
      const paymentResult23 = {
        id: queryParams.id || '',
        pricePaid: queryParams.amount_cents ? String(queryParams.amount_cents) : '0',
        status: queryParams.success || '',
        email_address: queryParams.email_address || '', // Provide a default or handle accordingly
      };
      updateOrderToPaid({ orderId: 'a27adc8c-832b-42ab-afce-fe4e6f82fd13', paymentResult: paymentResult23 })
        .then(() => {
          console.log('Order updated to paid');
        })
        .catch((error) => {
          console.error('Error updating order:', error);
        });
    }
  }, [queryParams]);

  if (!queryParams) {
    return <div>Loading...</div>;
  }

  const isSuccess = queryParams.success === 'true';
  const message = queryParams['data.message'] || '';

  return (
    <div>
      <h1>Payment Result</h1>
      {isSuccess ? (
        <h2 style={{ color: 'green' }}>Your payment is approved: {message}</h2>
      ) : (
        <h2 style={{ color: 'red' }}>Your payment failed: {message}</h2>
      )}
    </div>
  );
};

export default PaymentResult;
