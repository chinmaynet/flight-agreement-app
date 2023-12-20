"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

const ActivationPage = () => {

    const [activationToken, setActivationToken] = useState("");
    const [activationError, setActivationError] = useState<string | null>(null);
    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActivationToken(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("token is ", activationToken);
      
        try {
            const userEmail = localStorage.getItem('signupEmail');
            console.log("email is  ", userEmail);
            const response = await fetch('https://localhost:44355/api/FAALoginSignup/ActivateAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ActivationToken: activationToken, UserEmail: userEmail }),
            });
            
            if (response.ok) {
               
                localStorage.removeItem('signupEmail');

                
              
                const data =await response.json(); 
                localStorage.setItem('user', JSON.stringify(data));
                if (data.userRole === "TourOperator") {
                    router.push("/tourOperator");
                } else if (data.userRole === "AirlineManager") {
                    router.push("/airlineManager");
                }
                

            } else {
                localStorage.removeItem('user');
                const data = await response.json();
                console.error('Error response:', data);
                setActivationError(data.message || 'Failed to activate account');
            }
            console.log('Response status:', response.status);            
        }
        catch (error) {
            console.error('Error during activation:', error);
            setActivationError('An unexpected error occurred. Please try again later.');
        }
    };

    // router.push("/airlineManager"); 


    return (
        <div className="content flex justify-center">
            <div className="w-full">
                <div>
                    <div className="flex justify-center"><h1 className="text-2xl font-bold">Activation Page</h1></div>
                    <div className="flex justify-center my-4"><p>Please check your email for the activation token.</p></div>
                </div>
                <div className="ActivationForm mt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="ActivationToken">Activation Token:</label>
                            <input
                                type="text"
                                id="ActivationToken"
                                name="ActivationToken"
                                value={activationToken}
                                onChange={handleChange}
                                className="w-full p-2 border"
                                required
                            />
                        </div>
                        {activationError && (
                            <div className="text-red-500 text-sm">{activationError}</div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4"
                            >
                                Activate Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ActivationPage;
