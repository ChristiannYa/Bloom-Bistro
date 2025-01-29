import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config/api';

import SuccessPopup from '../components/SuccessPopUp';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    adminCode: '',
  });

  const [error, setError] = useState('');

  console.log('Current API URL:', API_URL);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isRegistering ? '/register' : '/login';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (!isRegistering) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', data.isAdmin);
        navigate('/');
      } else {
        setShowSuccessPopUp(true);

        setFormData({
          username: '',
          password: '',
          adminCode: '',
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePopUpClose = () => {
    setShowSuccessPopUp(false);
    setIsRegistering(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-acc-4 py-12 px-4 sm:px-6 lg:px-8">
      {showSuccessPopUp && <SuccessPopup onClose={handlePopUpClose} />}
      <div className="screen800 w-full space-y-8 login">
        <div>
          <h2 className="text-center text-3xl font-semibold font-inter text-acc-1">
            {isRegistering ? 'Admin Register' : 'Admin Login'}
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="login__inputs">
            <div className="flex max-md:flex-col gap-y-2 gap-x-2">
              {/* username */}
              <div className="login__input">
                <input
                  name="username"
                  type="text"
                  required
                  className="appearance-none w-full relative block px-3 py-2"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {/* password */}
              <div className="relative login__input flex">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none relative block px-3 py-2"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {/* show password btn */}
                <button
                  type="button"
                  className="bg-acc-2 text-acc-1 text-sm w-14 rounded-r-lg flex-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            {/* admin code */}
            <div className="login__input">
              {isRegistering && (
                <input
                  name="adminCode"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2"
                  placeholder="Admin Code"
                  value={formData.adminCode}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="focused flex justify-center p-2 mx-auto border border-transparent text-sm font-medium rounded-md text-white bg-acc-1"
            >
              {isRegistering ? 'Sign up' : 'Sign in'}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-acc-1 hover:italic"
              >
                {isRegistering
                  ? 'Already have an account? Sign in'
                  : 'Need an account? Sign up'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
