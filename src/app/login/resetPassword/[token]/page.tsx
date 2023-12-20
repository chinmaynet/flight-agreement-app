"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function ResetPassword(params: any) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValidationError, setPasswordValidationError] = useState('');
  console.log(params);
  console.log("Token",params.params.token);
  console.log("userEmail",params.searchParams.email);

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

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (!validatePassword(newPassword)) {          
      return;
    }

    try {
      if (newPassword !== confirmPassword) {
        setPasswordsMatch(false);
        return;
      }
      const token = params.params.token;
      const userEmail = params.searchParams.email
      console.log("token is ", token)
      const response = await fetch('https://localhost:44355/api/FAALoginSignup/ResetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail,
          resetToken: token,
          newPassword,
        }),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Password reset failed');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  useEffect(() => {  
    setPasswordsMatch(true);
  }, [newPassword]);

  return (
    <div className="content flex justify-center">
      <div>
        <h1 className='flex justify-center'>Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <div>
            <label>New Password:</label>
            <input
              className="w-full p-2 border"
              type="password"
              value={newPassword}
              onChange={(e) => {setNewPassword(e.target.value);
                validatePassword(e.target.value);}}
              required
            />
             {passwordValidationError && (
            <p className="text-red-500 text-sm">{passwordValidationError}</p>
          )}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              className={`w-full p-2 border ${!passwordsMatch && 'border-red-500'}`}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {!passwordsMatch && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4"
            type="submit" 
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}