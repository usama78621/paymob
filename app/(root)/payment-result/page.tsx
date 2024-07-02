"use client";
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentResult() {
  const params = useParams()
  console.log(params)


  return (
    <div>
      <p>Transaction ID: </p>
    </div>
  );
};


