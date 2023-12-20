"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
const Login = () => {
    const router = useRouter();

    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;

    // const[user, setUser] = useState(null);
    // useEffect(() => {        
    // },[]);

    useEffect(() => {
        if (userData !== null) {
            if (userData.userRole === 'TourOperator') {
                router.push('/tourOperator');
            } else if (userData.userRole === 'AirlineManager') {
                router.push('/airlineManager');
            }
        }
    }, [userData]);

    const isEmailValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(userEmail);
    };

    const handleLogin = async () => {
        try {
            if (!isEmailValid()) {
                console.error('Invalid email format');
                return;
            }
            console.log("datais ", userEmail, userPassword);
            const response = await fetch('https://localhost:44355/api/FAALoginSignup/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    userPassword,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data));
                console.log('Login successful:', data.userRole);
                if (data.userRole === "TourOperator") {
                    router.push("/tourOperator");
                } else if (data.userRole === "AirlineManager") {
                    router.push("/airlineManager");
                }
            }
            else if (response.status === 401) {
                const errorData = await response.json();
                setLoginError(errorData?.message || 'Invalid email or password.');
            }
            else {
                const errorData = await response.json();
                setLoginError(errorData?.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleEmailBlur = () => {
        setTouchedEmail(true);
        setLoginError(null);
    };
    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
      
        setLoginError(null);
      };
    return (
        <div className="content flex mt-16 justify-center">
            {/* items-center  h-screen */}
            <div>
                <h1 className="flex justify-center">Login Page</h1>
                <form>
                    <div>
                        <label>Email:</label>
                        <input
                            className={`w-full p-2 border ${touchedEmail && !isEmailValid() && 'border-red-500'}`}
                            type="email"
                            value={userEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmailBlur}
                        />
                        {touchedEmail && !isEmailValid() && (
                            <p className="text-red-500 text-sm">Please enter a valid email address.</p>
                        )}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            className="w-full p-2 border"
                            type="password"
                            value={userPassword}                    
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button
                        className="flex justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4"
                        type="button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    {loginError && <p className="text-red-500">{loginError}</p>} 
                </form> <Link className="text-blue-500" href={"/login/forgotPassword"}>Forgot Password</Link>

            </div>
        </div>
    );
};

export default Login;
