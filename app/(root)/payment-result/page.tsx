"use client";
import { useParams } from 'next/navigation';

export default function PaymentResult() {
  const params = useParams()
  console.log(params)


  return (
    <div>
      <p>Transaction ID </p>
    </div>
  )
}


