import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="font-livvic text-acc-1 hover:text-red-500 w-[120px] px-4 py-2 max-md:mt-2"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
