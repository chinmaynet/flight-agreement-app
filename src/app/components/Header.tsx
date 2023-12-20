"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../tourOperator.jpg';
import { useRouter } from 'next/navigation';
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { RiLoginBoxFill } from "react-icons/ri";
// interface User {
//     role: string;
// }
export default function Header() {
    const router = useRouter();
    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    const [user, setUser] = useState<boolean>(false);

    // if(userData!==null){
    //     setUser(true);
    // }

    useEffect(() => {
        if (userData !== null) {
            setUser(true);
        } else {
            setUser(false);
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('signupEmail');
        setUser(false);
        router.push("/");
    };

    const redirectToHome = () => {
        router.push("/");
    }

    return (

        <div className="flex justify-between items-center p-4">

            <div className="flex items-center">
                <div className="sm:block w-44 cursor-pointer">
                    <Image
                        onClick={redirectToHome}
                        src={Logo}
                        alt="Flight Agreement App Logo"
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>

                <link
                    href="https://fonts.googleapis.com/css2?family=Charmonman&display=swap"
                    rel="stylesheet"
                />
                <div>
                    <h1 onClick={redirectToHome} className="cursor-pointer text-2xl ml-4 hidden sm:block handrwrittenFont">
                        Flight Agreement Application
                    </h1>
                </div>
            </div>
            <div className="flex items-center">
                {user ? (
                    <>
                        {userData.userRole === 'AirlineManager' ? (
                            <nav className="flex justify-between space-x-4">
                                
                                <Link href="/userProfile">
                                <FaUserAlt/></Link>
                                <Link href="/airlineManager">Dashboard</Link>
                                <button onClick={handleLogout} className="text-blue-500">
                                <IoLogOut />
                                </button>
                            </nav>
                        ) : (
                            <nav className="flex justify-between space-x-4">
                               
                                <Link href="/userProfile"> <FaUserAlt/></Link>
                                <Link href="/tourOperator">Dashboard</Link>
                                <button onClick={handleLogout} className="text-blue-500">
                                <IoLogOut />
                                </button>
                            </nav>
                        )}
                    </>
                ) : (
                    <nav className="flex justify-between space-x-4">
                        <Link className="text-blue-500" href="/signup">
                            Signup
                        </Link>
                        <Link href="/login" className="text-blue-500">
                            Login
                        {/* <IoLogIn /> */}
                        {/* <RiLoginBoxFill /> */}
                        </Link>
                    </nav>
                )}
            </div>
        </div>
    );
}
