"use client"
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../plane-icon.svg';
import Logo2 from '../tourOperator.jpg'
import { usePathname } from 'next/navigation';

export default function Header2() {
    const pathName = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                closeSidebar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    let headerContent = null;

    if (pathName === "/tourOperator" || pathName === "/tourOperator/flightRecords" || pathName === "/tourOperator/masterContract" || pathName === "/tourOperator/annexes" || pathName === "/tourOperator/seasonDetails") {
        headerContent = (
            <div>
                <div className='sm:flex justify-center p-2 bg-gray-400'>

                    <ul className='hidden sm:flex w-5/6 justify-between md:w-3/4 lg:w-3/5 xl:w-3/5'>
                        {/* <li><Link href="/">Tour Operators</Link></li> */}
                        <li><Link href="/tourOperator/flightRecords">Flight Records</Link></li>
                        <li><Link href="/tourOperator/masterContract">Master Contract</Link></li>
                        <li><Link href="/tourOperator/annexes">Annexes</Link></li>
                        <li><Link href="/tourOperator/seasonDetails">Seasons Details</Link></li>
                    </ul>


                    <div className="sm:hidden">
                        <button className="text-white focus:outline-none" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                        </button>
                    </div>


                    {isSidebarOpen && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50" onClick={closeSidebar}>
                            <div ref={sidebarRef} className="fixed inset-y-0 left-0 w-56 bg-white shadow h-full overflow-y-auto transition-transform transform">
                                <ul className="py-4">
                                    <div className="sm:block w-44 ml-3 mb-5 mt-5">
                                        <Image
                                            src={Logo2}
                                            alt='Flight Agreement App Logo'
                                            layout="responsive"
                                            objectFit="cover"
                                        />
                                    </div>
                                    {/* <li className="p-3 my-2 hover:bg-gray-400"><Link href="/">Tour Operators</Link></li> */}
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/tourOperator/flightRecords">Flight Records</Link></li>
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/tourOperator/masterContract">Master Contract</Link></li>
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/tourOperator/annexes">Annexes</Link></li>
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/tourOperator/seasonDetails">Seasons</Link></li>


                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } else if (pathName === "/airlineManager" || pathName === "/airlineManager/tourOperatorManagment" || pathName === "/airlineManager/flightRecordsManagment" || pathName === "/airlineManager/seasonCodification" || pathName === "/airlineManager/annexManagment" || pathName === "/airlineManager/masterContractManagment") {
        headerContent = (
            <div>
                <div className='sm:flex justify-center p-2 bg-gray-400'>

                    <ul className='hidden sm:flex w-5/6 justify-between md:w-3/4 lg:w-3/5 xl:w-3/5'>
                        <li><Link href="/airlineManager/tourOperatorManagment">Tour Operators</Link></li>
                        <li><Link href="/airlineManager/flightRecordsManagment">Flight Records</Link></li>
                        <li><Link href="/airlineManager/seasonCodification">Seasons Codification</Link></li>
                        <li><Link href="/airlineManager/annexManagment">Annexes</Link></li>
                        <li><Link href="/airlineManager/masterContractManagment">Master Contract</Link></li>
                    </ul>

                    <div className="sm:hidden">
                        <button className="text-white focus:outline-none" onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                        </button>
                    </div>


                    {isSidebarOpen && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50" onClick={closeSidebar}>
                            <div ref={sidebarRef} className="fixed inset-y-0 left-0 w-56 bg-white shadow h-full overflow-y-auto transition-transform transform">
                                <ul className="py-4">
                                    <div className="sm:block w-44 ml-3 mb-5 mt-5">
                                        <Image
                                            src={Logo2}
                                            alt='Flight Agreement App Logo'
                                            layout="responsive"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/airlineManager/tourOperatorManagment">Tour Operators</Link></li>
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/airlineManager/flightRecordsManagment">Flight Records</Link></li>
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/airlineManager/seasonCodification">Seasons Codification</Link></li>
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/airlineManager/annexManagment">Annexes</Link></li>
                                    <li className="p-3 my-2 hover:bg-gray-400"><Link href="/airlineManager/masterContractManagment">Master Contract</Link></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {

    }

    return headerContent;
}
