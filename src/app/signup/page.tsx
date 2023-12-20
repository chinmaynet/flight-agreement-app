"use client"
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function signup() {
    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    const router = useRouter();

    useEffect(() => {
        if (userData !== null) {
            if (userData.userRole === 'TourOperator') {
                router.push('/tourOperator');
            } else if (userData.userRole === 'AirlineManager') {
                router.push('/airlineManager');
            }
        }
    }, [userData]);
    return (
        <div className="content flex mt-16 justify-center ">
            {/* items-center  h-screen */}
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">What Role you would like to have ?</h2>
                <div className="flex flex-col space-y-4">
                    <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" href="/signup/signup_am">Airline Manager</Link><br />
                    <Link className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" href="/signup/signup_to">Tour Operator</Link><br />
                </div>
            </div>
        </div>
    )
}