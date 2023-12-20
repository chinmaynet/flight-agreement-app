"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface FormData {
    TourOperatorName: string;
    TourOperatorAddress: string;
    TourOperatorEmail: string;
    TourOperatorPhone: string;
    TourOperatorLandLine: string;
    TourOperatorContactPreferences: number;
    TourOperatorPassword: string;
}

const Signup_to = () => {
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
 


    const [formData, setFormData] = useState<FormData>({
        TourOperatorName: '',
        TourOperatorAddress: '',
        TourOperatorEmail: '',
        TourOperatorPhone: '',
        TourOperatorLandLine: '',
        TourOperatorContactPreferences: 0,
        TourOperatorPassword: ''
    });

    const validatePassword = (password: string) => {

        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                TourOperatorPassword: 'Password does not meet the complexity requirements.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                TourOperatorPassword: '',
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const parsedValue = name === 'TourOperatorContactPreferences' ? parseInt(value, 10) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue,
        }));
    };


    const [errors, setErrors] = useState({
        TourOperatorPhone: '',
        TourOperatorEmail: '',
        TourOperatorPassword: ''
    });
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (errors.TourOperatorPhone || errors.TourOperatorEmail || errors.TourOperatorPassword) {
            alert('Please fix the validation errors before submitting the form.');
            return;
        }

        console.log('Form submitted:', formData);
        // try {
            const response = await fetch('https://localhost:44355/api/FAALoginSignup/CreateTourOperator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // const data = await response.json();
                // localStorage.setItem('user', JSON.stringify(data));        
                // router.push("/tourOperator");
                localStorage.setItem('signupEmail', formData.TourOperatorEmail); 
                router.push('/signup/activationPage');
            } else {
                alert('Failed to register Tour Operator. Please try again.');
            }
        // } catch (error) {
        //     console.error('Error during registration:', error);
        //     alert('An unexpected error occurred. Please try again later.');
        // }
    };

    useEffect(() => {
        if (formData.TourOperatorPhone !== '') {
            validatePhoneNumber(formData.TourOperatorPhone);
        }
        if (formData.TourOperatorEmail !== '') {
            validateEmail(formData.TourOperatorEmail);
        }
    }, [formData.TourOperatorPhone, formData.TourOperatorEmail]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                TourOperatorEmail: 'Please enter a valid email address.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                TourOperatorEmail: '',
            }));
        }
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(phoneNumber)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                TourOperatorPhone: 'Please enter a valid phone number.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                TourOperatorPhone: '',
            }));
        }
    };

    return (
        <div className="content flex justify-center">
            <div className="w-full">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold">Tour Operator Registration Page</h1>
                </div>
                <div className="RegistrationForm mt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="TourOperatorName">Name:</label>
                            <input
                                type="text"
                                id="TourOperatorName"
                                name="TourOperatorName"
                                value={formData.TourOperatorName}
                                onChange={handleChange}
                                className="w-full p-2 border"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="TourOperatorAddress">Address:</label>
                            <input
                                type="text"
                                id="TourOperatorAddress"
                                name="TourOperatorAddress"
                                value={formData.TourOperatorAddress}
                                onChange={handleChange}
                                className="w-full p-2 border"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="TourOperatorEmail">Email:</label>
                            <input
                                type="email"
                                id="TourOperatorEmail"
                                name="TourOperatorEmail"
                                value={formData.TourOperatorEmail}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.TourOperatorEmail && 'border-red-500'}`}
                                required
                            />
                            {errors.TourOperatorEmail && (
                                <p className="text-red-500 text-sm">{errors.TourOperatorEmail}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="TourOperatorPhone">Phone:</label>
                            <input
                                type="tel"
                                id="TourOperatorPhone"
                                name="TourOperatorPhone"
                                value={formData.TourOperatorPhone}
                                onChange={handleChange}
                                className={`w-full p-2 border ${errors.TourOperatorPhone && 'border-red-500'}`}
                                required
                            />
                            {errors.TourOperatorPhone && (
                                <p className="text-red-500 text-sm">{errors.TourOperatorPhone}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="TourOperatorLandLine">Landline:</label>
                            <input
                                type="tel"
                                id="TourOperatorLandLine"
                                name="TourOperatorLandLine"
                                value={formData.TourOperatorLandLine}
                                onChange={handleChange}
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label htmlFor="TourOperatorContactPreferences">Contact Preferences:</label>
                            <select
                                id="TourOperatorContactPreferences"
                                name="TourOperatorContactPreferences"
                                value={formData.TourOperatorContactPreferences}
                                onChange={handleChange}
                                className="w-full p-2 border"
                                required
                            >

                                <option value={0}>Email</option>
                                <option value={1}>Phone</option>
                                <option value={2}>Landline</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="TourOperatorPassword">Password:</label>
                            <input
                                type="password"
                                id="TourOperatorPassword"
                                name="TourOperatorPassword"
                                value={formData.TourOperatorPassword}
                                onChange={(e) => {
                                    handleChange(e);
                                    validatePassword(e.target.value);
                                }}
                                className={`w-full p-2 border ${errors.TourOperatorPassword && 'border-red-500'}`}
                                required
                            />{errors.TourOperatorPassword && (
                                <p className="text-red-500 text-sm">{errors.TourOperatorPassword}</p>
                            )}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup_to;
