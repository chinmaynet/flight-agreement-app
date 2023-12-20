"use client"
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [userEmail, setEmail] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [userNotFoundError, setUserNotFoundError] = useState(false);

    const isEmailValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(userEmail);
    };

    const handleEmailBlur = () => {
        setTouchedEmail(true);
    };

    const handleEmailChange = () => {
        
        setUserNotFoundError(false);
    };

    const handleSubmit = async () => {
        try {
            if (!isEmailValid()) {
                console.error('Invalid email format');
                return;
            }
           
            const response = await fetch('https://localhost:44355/api/FAALoginSignup/ResetPasswordRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                }),
            });

            if (response.ok) {                
                setEmailSent(true);
            }
             else if (response.status === 404) {
                setUserNotFoundError(true); 
            } 
            else {
                console.error('Password reset request failed');
            }
        } catch (error) {
            console.error('Error during password reset request:', error);
        }
    };

    return (
        <div className="content flex justify-center">
            <div>
                <h1 className="flex justify-center">Forgot Password</h1>
                {!emailSent ? (
                    <form>
                        <div>
                            <label>Email:</label>
                            <input
                                className={`w-full p-2 border ${touchedEmail && !isEmailValid() && 'border-red-500'}`}
                                type="email"
                                value={userEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={handleEmailBlur}
                                onInput={handleEmailChange}
                            />
                            {touchedEmail && !isEmailValid() && (
                                <p className="text-red-500 text-sm">Please enter a valid email address.</p>
                            )}
                             {userNotFoundError && (
                                <p className="text-red-500 text-sm">User not found with that email.</p>
                            )}
                        </div>
                        <button
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Send Reset Password Email
                        </button>
                    </form>
                ) : (
                    <p className="mt-4">An email with instructions to reset your password has been sent to your email address.</p>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
