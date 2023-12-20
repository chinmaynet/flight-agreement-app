"use client"
import { useEffect, useState } from 'react';

const UpdatePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordValidationError, setPasswordValidationError] = useState('');
    const handlePasswordBlur = () => {
        setError('');
        setSuccessMessage('');
    };

    const validatePassword = (password:any) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
        if (!passwordRegex.test(password)) {
          setPasswordValidationError('Password does not meet the complexity requirements.');
          return false;
        } else {
          setPasswordValidationError('');
          return true;
        }
      };
    const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault(); 

        if (!validatePassword(newPassword)) {          
            return;
        }

        const data = localStorage.getItem('user');
        const user = data ? JSON.parse(data) : null;
        const userEmail = user ? user.userEmail : null;
        const token = user.token;
        console.log('User Email:', userEmail);
        try {
            if (newPassword !== confirmNewPassword) {
                setPasswordsMatch(false);
                return;
              }

            console.log(currentPassword, newPassword, confirmNewPassword)
            const response = await fetch('https://localhost:44355/api/FAALoginSignup/UpdatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmNewPassword,
                    userEmail
                }),
            });

            if (response.ok) {
                setSuccessMessage('Password updated successfully');

            } else {
                const errorData = await response.json();

                setError(errorData?.message || 'Password update failed.');
            }

        } catch (error) {
            console.error('Error during password update:', error);
        }
    };
    useEffect(() => {  
        setPasswordsMatch(true);
      }, [newPassword]);
    return (
        <div className="content">
            <h1 className='flex justify-center'> Update Password</h1>
            <form onSubmit={handleUpdatePassword}>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2 border"
                        onFocus={handlePasswordBlur}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) =>{
                            setNewPassword(e.target.value);
                            validatePassword(e.target.value);
                        }
                        } 
                        className="w-full p-2 border"
                        onFocus={handlePasswordBlur}
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className={`w-full p-2 border ${!passwordsMatch && 'border-red-500'}`}
                        onFocus={handlePasswordBlur}
                        required
                    />
                     {!passwordsMatch && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
                </div>
                <div>
                    <button type="submit"  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4">
                        Update Password
                    </button>
                    {passwordValidationError && (
            <p className="text-red-500 text-sm">{passwordValidationError}</p>
          )}
                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                </div>

            </form>
        </div>
    );
};

export default UpdatePassword;
