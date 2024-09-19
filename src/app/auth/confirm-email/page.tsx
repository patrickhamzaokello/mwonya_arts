"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function SignupConfirmation() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // In a real application, you'd get the email from your authentication state or URL parameter
    const userEmail = localStorage.getItem('userEmail') || 'your email';
    setEmail(userEmail);
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Head>
        <title>Confirm Your Email</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Image section */}
      <div className="w-full lg:w-2/3 h-1/2 lg:h-screen relative">
        <Image
          src="/api/placeholder/1200/800"
          alt="Artist Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Content section */}
      <div className="w-full lg:w-1/3 h-1/2 lg:h-screen bg-white flex flex-col justify-center p-8 lg:p-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">
          Check your email
        </h2>
        <div className="space-y-4">
          <p className="text-sm lg:text-base text-gray-600">
            We've sent a confirmation link to:
          </p>
          <p className="text-lg lg:text-xl font-medium text-gray-900">{email}</p>
          <p className="text-sm lg:text-base text-gray-600">
            Please check your email and click on the link to confirm your account.
          </p>
        </div>
        <div className="mt-8">
          <p className="text-xs lg:text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or
            <button className="ml-1 font-medium text-blue-600 hover:text-blue-500">
              click here to resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}