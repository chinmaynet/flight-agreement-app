// "use client"
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// enum ContactPreference {
//     Email = 0,
//     Phone = 1,
//     Landline = 2,
// }
// interface TourOperatorDetails {
//     tourOperatorAddress: string;
//     tourOperatorContactPreferences: ContactPreference;
//     tourOperatorLandLine: string;
//     tourOperatorPhone: string;
// }

// interface AirlineManagerDetails {
//     airlineManagerPhone: string;
//     airlineManagerLandLine: string;
// }

// interface UserProfileProps {
//     userName: string;
//     userEmail: string;
//     userRole: string;
//     details: TourOperatorDetails | AirlineManagerDetails;
// }

// const UserProfile = () => {
//     const router = useRouter();

//     const [user, setUser] = useState<UserProfileProps>();
//     const [editMode, setEditMode] = useState(false);

//     useEffect(() => {
//         const userData = localStorage.getItem('user');
//         setUser(userData ? JSON.parse(userData) : null);
//     }, []);

//     const handleUpdateDetails = () => {
//         setEditMode(true)
//     };
//     const handleBackBtn = () => {
//         setEditMode(false)
//     }

//     if (!user) {
//         return <div>Loading...</div>;
//     }
//     return (
//         <div className="content">
//             <div className=" bg-white rounded-md shadow-md p-6">
//                 <h1 className="text-3xl font-semibold mb-4 text-center">User Profile</h1>
//                 {!editMode && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                             <p className="text-lg font-semibold mb-2">Name</p>
//                             <p>{user.userName}</p>
//                         </div>
//                         <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                             <p className="text-lg font-semibold mb-2">Email</p>
//                             <p>{user.userEmail}</p>
//                         </div>
//                         <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                             <p className="text-lg font-semibold mb-2">Role</p>
//                             <p>{user.userRole}</p>
//                         </div>

//                         {user.userRole === 'TourOperator' && (
//                             <>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Address</p>
//                                     <p>{(user.details as TourOperatorDetails).tourOperatorAddress}</p>
//                                 </div>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Contact Preference</p>
//                                     <p>{ContactPreference[(user.details as TourOperatorDetails).tourOperatorContactPreferences]}</p>
//                                 </div>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Landline Number</p>
//                                     <p>{(user.details as TourOperatorDetails).tourOperatorLandLine}</p>
//                                 </div>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2 ">Phone Number</p>
//                                     <p>{(user.details as TourOperatorDetails).tourOperatorPhone}</p>
//                                 </div>
//                             </>
//                         )}

//                         {user.userRole === 'AirlineManager' && (
//                             <>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Landline Number</p>
//                                     <p>{(user.details as AirlineManagerDetails).airlineManagerLandLine}</p>
//                                 </div>
//                                 <div className="p-3">
//                                     <p className="text-lg font-semibold mb-2">Phone Number</p>
//                                     <p>{(user.details as AirlineManagerDetails).airlineManagerPhone}</p>
//                                 </div>
//                             </>
//                         )}
//                         <br />
//                         <div><button
//                             onClick={() => {
//                                 setEditMode(false);
//                                 handleUpdateDetails();
//                             }}
//                             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                         >
//                             Update Details
//                         </button></div>
//                     </div>
//                 )}
//                 {editMode && (
//                     <div>
//                         {user.userRole === 'AirlineManager' && (
//                             <>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Name</p>
//                                     <input
//                                         type="text"
//                                         value={user.userName}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div>
//                                 {/* <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Email</p>
//                                     <input
//                                         type="text"
//                                         value={user.userEmail}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div> */}
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">LandLine Number</p>
//                                     <input
//                                         type="text"
//                                         value={(user.details as AirlineManagerDetails).airlineManagerLandLine}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Phone Number</p>
//                                     <input
//                                         type="text"
//                                         value={(user.details as AirlineManagerDetails).airlineManagerPhone}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div>
//                             </>
//                         )}
//                         {user.userRole === 'TourOperator' && (
//                             <>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Name</p>
//                                     <input
//                                         type="text"
//                                         value={user.userName}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div>
//                                 {/* <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Email</p>
//                                     <input
//                                         type="text"
//                                         value={user.userEmail}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div> */}
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Address</p>
//                                     <input
//                                         type="text"
//                                         value={(user.details as TourOperatorDetails).tourOperatorAddress}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Contact Preference</p>
//                                     <select
//                                         value={(user.details as TourOperatorDetails).tourOperatorContactPreferences}
//                                         onChange={(e) => {

//                                         }}
//                                         className="border p-2 w-full"
//                                     >
//                                         <option value={ContactPreference.Email}>Email</option>
//                                         <option value={ContactPreference.Phone}>Phone</option>
//                                         <option value={ContactPreference.Landline}>Landline</option>
//                                     </select>
//                                 </div>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Landline Number</p>
//                                     <input
//                                         type="text"
//                                         value={(user.details as TourOperatorDetails).tourOperatorLandLine}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div>
//                                 <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
//                                     <p className="text-lg font-semibold mb-2">Phone Number</p>
//                                     <input
//                                         type="text"
//                                         value={(user.details as TourOperatorDetails).tourOperatorPhone}

//                                         className="border p-2 w-full"
//                                     />
//                                 </div>
//                             </>
//                         )}

//                         <div className="">
//                             <button
//                                 onClick={handleUpdateDetails}
//                                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             >
//                                 Save Details
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     handleBackBtn();
//                                 }}
//                                 className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             >
//                                 Back
//                             </button></div>
//                     </div>
//                 )}

//             </div>
//         </div>

//     );
// }

// export default UserProfile;

"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum ContactPreference {
    Email = 0,
    Phone = 1,
    Landline = 2,
}
interface TourOperatorDetails {
    tourOperatorAddress: string;
    tourOperatorContactPreferences: ContactPreference;
    tourOperatorLandLine: string;
    tourOperatorPhone: string;
}

interface AirlineManagerDetails {
    airlineManagerPhone: string;
    airlineManagerLandLine: string;
}

interface UserProfileProps {
    userName: string;
    userEmail: string;
    userRole: string;
    details: TourOperatorDetails | AirlineManagerDetails;
}


const UserProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserProfileProps | null>(null);
    const [editMode, setEditMode] = useState(false);


    const [editedName, setEditedName] = useState<string>('');
    const [editedEmail, setEditedEmail] = useState<string>('');
    const [editedLandline, setEditedLandline] = useState<string>('');
    const [editedPhone, setEditedPhone] = useState<string>('');
    const [editedAddress, setEditedAddress] = useState<string>('');
    const [editedContactPreference, setEditedContactPreference] = useState<ContactPreference>(
        ContactPreference.Email
    );

    useEffect(() => {
        const userData = localStorage.getItem('user');
        setUser(userData ? JSON.parse(userData) : null);
    }, []);

    const handleUpdateDetails = () => {
        if (user) {
            setEditedName(user.userName);
            setEditedEmail(user.userEmail);

            if (user.userRole === 'TourOperator') {
                setEditedAddress((user.details as TourOperatorDetails).tourOperatorAddress);
                setEditedContactPreference((user.details as TourOperatorDetails).tourOperatorContactPreferences);
                setEditedLandline((user.details as TourOperatorDetails).tourOperatorLandLine);
                setEditedPhone((user.details as TourOperatorDetails).tourOperatorPhone);
            } else if (user.userRole === 'AirlineManager') {
                setEditedLandline((user.details as AirlineManagerDetails).airlineManagerLandLine);
                setEditedPhone((user.details as AirlineManagerDetails).airlineManagerPhone);
            }

            setEditMode(true);
        }
    };


    const handleSaveDetails = () => {
        if (user) {
            // const formData = new FormData();

            // formData.append('userName', editedName);
            // formData.append('userEmail', editedEmail);

            // if (user.userRole === 'TourOperator') {
            //     formData.append('tourOperatorAddress', editedAddress);
            //     formData.append('tourOperatorContactPreferences', editedContactPreference ? editedContactPreference.toString() : '');
            //     formData.append('tourOperatorLandLine', editedLandline);
            //     formData.append('tourOperatorPhone', editedPhone);
            // } else if (user.userRole === 'AirlineManager') {
            //     formData.append('airlineManagerLandLine', editedLandline);
            //     formData.append('airlineManagerPhone', editedPhone);
            // }

            const requestData = {
                userName: editedName,
                userEmail: editedEmail,      
                tourOperatorAddress:editedAddress,
                tourOperatorContactPreferences:(editedContactPreference ?? '').toString(),
                tourOperatorLandLine:editedLandline,
                tourOperatorPhone:editedPhone,
                airlineManagerLandLine:editedLandline,
                airlineManagerPhone:editedPhone,
            };

            // console.log(formData)
            // for (const pair of formData.entries()) {
            //     console.log(`${pair[0]}: ${pair[1]}`);
            // }

            const userString = localStorage.getItem('user');
            const userData = userString ? JSON.parse(userString) : null;
            const token = userData.token

            const userId = userData.userId;
            const apiUrl = `https://localhost:44355/api/FAALoginSignup/UpdateUserDetails/${userId}`;

            fetch(apiUrl, {
                method: 'PUT',
                body:JSON.stringify(requestData),
                //  formData,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `bearer ${token}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(updatedDetails => {

                    const updatedUser = { ...user, ...updatedDetails };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                })
                .catch(error => {

                    console.error('Update failed:', error);
                })
                .finally(() => {
                    setEditMode(false);
                });
        }
    };

    const handleBackBtn = () => {
        setEditMode(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <Link className="float-right mb-5 p-1 text-blue-500" href={"/login/updatePassword"}>Update Password</Link>
            <div className="bg-white rounded-md shadow-md p-6">
                <div >

                    <h1 className="text-3xl font-semibold mb-4 text-center">User Profile</h1>

                </div>

                {!editMode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Name</p>
                            <p>{user.userName}</p>
                        </div>
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Email</p>
                            <p>{user.userEmail}</p>
                        </div>
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Role</p>
                            <p>{user.userRole}</p>
                        </div>

                        {user.userRole === 'TourOperator' && (
                            <>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Address</p>
                                    <p>{(user.details as TourOperatorDetails)?.tourOperatorAddress}</p>
                                </div>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Contact Preference</p>
                                    <p>{ContactPreference[(user.details as TourOperatorDetails)?.tourOperatorContactPreferences]}</p>
                                </div>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Landline Number</p>
                                    <p>{(user.details as TourOperatorDetails)?.tourOperatorLandLine}</p>
                                </div>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2 ">Phone Number</p>
                                    <p>{(user.details as TourOperatorDetails)?.tourOperatorPhone}</p>
                                </div>
                            </>
                        )}

                        {user.userRole === 'AirlineManager' && (
                            <>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Landline Number</p>
                                    <p>{(user.details as AirlineManagerDetails)?.airlineManagerLandLine}</p>
                                </div>
                                <div className="p-3">
                                    <p className="text-lg font-semibold mb-2">Phone Number</p>
                                    <p>{(user.details as AirlineManagerDetails)?.airlineManagerPhone}</p>
                                </div>
                            </>
                        )}
                        <br />
                        <div><button
                            onClick={() => {
                                setEditMode(false);
                                handleUpdateDetails();
                            }}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Update Details
                        </button></div>
                    </div>
                )}

                {editMode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {user.userRole === 'AirlineManager' && (
                            <>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Name</p>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName((e.target.value))}
                                        className="border p-2 w-full"
                                    />
                                </div>

                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">LandLine Number</p>
                                    <input
                                        type="text"
                                        // value={(user.details as AirlineManagerDetails).airlineManagerLandLine}
                                        value={editedLandline}
                                        onChange={(e) => setEditedLandline((e.target.value))}
                                        className="border p-2 w-full"
                                    />
                                </div>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Phone Number</p>
                                    <input
                                        type="text"
                                        // value={(user.details as AirlineManagerDetails).airlineManagerPhone}
                                        value={editedPhone}
                                        onChange={(e) => setEditedPhone((e.target.value))}
                                        className="border p-2 w-full"
                                    />
                                </div>
                            </>
                        )}
                        {user.userRole === 'TourOperator' && (
                            <>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Name</p>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName((e.target.value))}
                                        className="border p-2 w-full"
                                    />
                                </div>

                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Address</p>
                                    <input
                                        type="text"
                                        value={editedAddress}
                                        onChange={(e) => setEditedAddress((e.target.value))}
                                        className="border p-2 w-full"
                                    />
                                </div>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Contact Preference</p>
                                    <select
                                        value={editedContactPreference}
                                        onChange={(e) => setEditedContactPreference(Number(e.target.value))}
                                        className="border p-2 w-full"
                                    >
                                        <option value={ContactPreference.Email}>Email</option>
                                        <option value={ContactPreference.Phone}>Phone</option>
                                        <option value={ContactPreference.Landline}>Landline</option>
                                    </select>
                                </div>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Landline Number</p>
                                    <input
                                        type="text"
                                        value={editedLandline}
                                        onChange={(e) => setEditedLandline((e.target.value))}
                                        className="border p-2 w-full"
                                    />
                                </div>
                                <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                    <p className="text-lg font-semibold mb-2">Phone Number</p>
                                    <input
                                        type="text"
                                        value={editedPhone}
                                        onChange={(e) => setEditedPhone((e.target.value))}
                                        className="border p-2 w-full"
                                    />
                                </div>
                            </>
                        )}
                        <div className="">
                            <button
                                onClick={handleSaveDetails}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save Details
                            </button>
                            <button
                                onClick={handleBackBtn}
                                className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default UserProfile;