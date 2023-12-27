"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum ContactPreference {
    Email = 0,
    Phone = 1,
    Landline = 2,
}

interface UserProfileProps {
    tourOperatorName: string;
    tourOperatorEmail: string;
    tourOperatorAddress: string;
    tourOperatorContactPreferences: ContactPreference;
    tourOperatorLandLine: string;
    tourOperatorPhone: string;
}

const EditTourOperator = (params: any) => {
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
        getUser();
    }, []);

    const tourOperatorId = params.params.tourOperatorId;
    const data = localStorage.getItem('user');
    const userr = data ? JSON.parse(data) : null;
    const token = userr.token;

    const getUser = async () => {
        try {
            const response = await fetch(`https://localhost:44355/api/AirlineManagerOperations/GetTourOperatorById/${tourOperatorId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error('Failed to fetch data.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleUpdateDetails = () => {
        if (user) {
            setEditedName(user.tourOperatorName);
            setEditedEmail(user.tourOperatorEmail);
            setEditedAddress(user.tourOperatorAddress);
            setEditedContactPreference(user.tourOperatorContactPreferences);
            setEditedLandline(user.tourOperatorLandLine);
            setEditedPhone(user.tourOperatorPhone);
            setEditMode(true);
        }
    };

    const handleSaveDetails = () => {
        if (user) {
            // if (!editedName || !editedEmail || !editedAddress || !editedLandline || !editedPhone) {
            //     alert('Please fill in all fields.');
            //     return;
            // }
            const updatedTourOperatorDto = {
                tourOperatorName: editedName,
                tourOperatorEmail: editedEmail,
                tourOperatorAddress: editedAddress,
                tourOperatorContactPreferences: editedContactPreference,
                tourOperatorLandLine: editedLandline,
                tourOperatorPhone: editedPhone,
            };

            const apiUrl = `https://localhost:44355/api/AirlineManagerOperations/UpdateTourOperator/${tourOperatorId}`;

            fetch(apiUrl, {
                method: 'PUT',
                body: JSON.stringify(updatedTourOperatorDto),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(updatedDetails => {
                    console.log('Updated Details:', updatedDetails);
                    setUser(prevUser => ({ ...prevUser, ...updatedDetails }));
                })
                .catch(error => {
                    console.error('Update failed:', error);
                })
                .finally(() => {
                    setEditMode(false);
                    getUser();
                });
        }
    };


    const handleBackBtn = () => {
        setEditMode(false);
    };
    const handleBack = () => {
        router.push('/airlineManager/tourOperatorManagment')
    }
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <div className="bg-white rounded-md shadow-md p-6">
                <div>
                    <h1 className="text-3xl font-semibold mb-4 text-center">Tour Operator Profile</h1>
                </div>

                {!editMode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Name</p>
                            <p>{user.tourOperatorName}</p>
                        </div>
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Email</p>
                            <p>{user.tourOperatorEmail}</p>
                        </div>
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Address</p>
                            <p>{user.tourOperatorAddress}</p>
                        </div>
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Contact Preference</p>
                            <p>{ContactPreference[user.tourOperatorContactPreferences]}</p>
                        </div>
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Landline Number</p>
                            <p>{user.tourOperatorLandLine}</p>
                        </div>
                        <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                            <p className="text-lg font-semibold mb-2">Phone Number</p>
                            <p>{user.tourOperatorPhone}</p>
                        </div>
                        <br />
                        <div>
                            <button
                                onClick={() => {
                                    setEditMode(false);
                                    handleUpdateDetails();
                                }}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Update Details
                            </button>
                            <button
                                onClick={handleBack}
                                className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}

                {editMode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <form onSubmit={handleSaveDetails}>
                            <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                <p className="text-lg font-semibold mb-2">Name</p>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                <p className="text-lg font-semibold mb-2">Email</p>
                                <input
                                    type="text"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                <p className="text-lg font-semibold mb-2">Address</p>
                                <input
                                    type="text"
                                    value={editedAddress}
                                    onChange={(e) => setEditedAddress(e.target.value)}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                <p className="text-lg font-semibold mb-2">Contact Preference</p>
                                <select
                                    value={editedContactPreference}
                                    onChange={(e) => setEditedContactPreference(Number(e.target.value))}
                                    className="border p-2 w-full"
                                    required
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
                                    onChange={(e) => setEditedLandline(e.target.value)}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="p-3 border-b md:border-b-0 md:border-r lg:border-r-0 lg:border-b">
                                <p className="text-lg font-semibold mb-2">Phone Number</p>
                                <input
                                    type="text"
                                    value={editedPhone}
                                    onChange={(e) => setEditedPhone(e.target.value)}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="">
                                <button
                                    type="submit"
                                    // onClick={handleSaveDetails}
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
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditTourOperator;
