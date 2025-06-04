import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {currentUser.username}</h1>
      <p>This is your dashboard filled with some interesting and useless information:</p>
      <ul>
        <li>🌍 Earth spins at 1,000 mph.</li>
        <li>🧠 You use 100% of your brain, just not all at once.</li>
        <li>📡 Wi-Fi stands for nothing.</li>
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;