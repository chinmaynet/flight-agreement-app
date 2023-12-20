"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
const Signup_am = () => {
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

  const [formData, setFormData] = useState({
    AirlineManagerName: '',
    AirlineManagerEmail: '',
    AirlineManagerPhone: '',
    AirlineManagerLandLine: '',
    AirlineManagerPassword: '',
    ConfirmPassword: '',
  });

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AirlineManagerPassword: 'Password does not meet the complexity requirements.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AirlineManagerPassword: '',
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({
    AirlineManagerPhone: '',
    AirlineManagerEmail: '',
    AirlineManagerPassword: ''
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.AirlineManagerPhone || errors.AirlineManagerEmail || errors.AirlineManagerPassword) {
      alert('Please fix the validation errors before submitting the form.');
      return;
    }

    console.log('Form submitted:', formData);
    //api post call
    try {
      const response = await fetch('https://localhost:44355/api/FAALoginSignup/CreateAirlineManager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      // console.log('Response:', response);
      
      if (response.ok) {
        // const data = await response.json();
        // localStorage.setItem('user', JSON.stringify(data));
        // router.push("/airlineManager") 

        localStorage.setItem('signupEmail', formData.AirlineManagerEmail);        

        router.push('/signup/activationPage');
      } else {
        alert('Failed to register Airline Manager. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    if (formData.AirlineManagerPhone !== '') {
      validatePhoneNumber(formData.AirlineManagerPhone);
    }
    if (formData.AirlineManagerEmail !== '') {
      validateEmail(formData.AirlineManagerEmail);
    }
  }, [formData.AirlineManagerPhone, formData.AirlineManagerEmail]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AirlineManagerEmail: 'Please enter a valid email address.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AirlineManagerEmail: '',
      }));
    }

  }
  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AirlineManagerPhone: 'Please enter a valid phone number.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AirlineManagerPhone: '',
      }));
    }
  };

  return (
    <div className="content flex justify-center">
      <div className="w-full ">
        <div className="flex justify-center">
          <h1 className="text-2xl  font-bold">Airline Manager Registration Page</h1>
        </div>
        <div className="RegistrationForm  mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="AirlineManagerName">Name:</label>
              <input
                type="text"
                id="AirlineManagerName"
                name="AirlineManagerName"
                value={formData.AirlineManagerName}
                onChange={handleChange}
                className="w-full p-2 border"
                required
              />
            </div>
            <div>
              <label htmlFor="AirlineManagerEmail">Email:</label>
              <input
                type="email"
                id="AirlineManagerEmail"
                name="AirlineManagerEmail"
                value={formData.AirlineManagerEmail}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.AirlineManagerEmail && 'border-red-500'}`}
                required
              />{errors.AirlineManagerEmail && (
                <p className="text-red-500 text-sm">{errors.AirlineManagerEmail}</p>
              )}

            </div>
            <div>
              <label htmlFor="AirlineManagerPhone">Phone:</label>
              <input
                type="tel"
                id="AirlineManagerPhone"
                name="AirlineManagerPhone"
                value={formData.AirlineManagerPhone}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.AirlineManagerPhone && 'border-red-500'}`}
                required
              />
              {errors.AirlineManagerPhone && (
                <p className="text-red-500 text-sm">{errors.AirlineManagerPhone}</p>
              )}
            </div>
            <div>
              <label htmlFor="AirlineManagerLandLine">Landline:</label>
              <input
                type="tel"
                id="AirlineManagerLandLine"
                name="AirlineManagerLandLine"
                value={formData.AirlineManagerLandLine}
                onChange={handleChange}
                className="w-full p-2 border"
              />
            </div>
            <div>
              <label htmlFor="AirlineManagerPassword">Password:</label>
              <input
                type="password"
                id="AirlineManagerPassword"
                name="AirlineManagerPassword"
                value={formData.AirlineManagerPassword}
                onChange={(e) => {
                  handleChange(e);
                  validatePassword(e.target.value);
                }}
                className={`w-full p-2 border ${errors.AirlineManagerPassword && 'border-red-500'}`}
                required
              />{errors.AirlineManagerPassword && (
                <p className="text-red-500 text-sm">{errors.AirlineManagerPassword}</p>
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
  )
}

export default Signup_am;