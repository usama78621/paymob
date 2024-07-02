// app/payment-result/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateOrderToPaid } from '@/lib/actions/order.actions';

interface QueryParams {
  id: string;
  pending: string;
  amount_cents: string;
  success: string;
  order: string;
  'data.message': string;
  merchant_order_id: string,
  email_address: string; // Optional: If you might get email_address from the URL params
}

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParams | null>(null);

  useEffect(() => {
    const params: QueryParams = {
      id: "",
      pending: "",
      amount_cents: "",
      success: "",
      order: "",
      'data.message': "",
      merchant_order_id: "",
      email_address: "",
    };
    searchParams.forEach((value, key) => {
      params[key as keyof QueryParams] = value;
    });
    setQueryParams(params);
  }, [searchParams]);

  useEffect(() => {
    if (queryParams && queryParams.order) {
      const paymentResult23 = {
        id: queryParams.id,
        pricePaid: String(queryParams.amount_cents),
        status: queryParams.success,
        email_address: queryParams.email_address, // Provide a default or handle accordingly
      };
      updateOrderToPaid({ orderId: queryParams.merchant_order_id, paymentResult: paymentResult23 })
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
