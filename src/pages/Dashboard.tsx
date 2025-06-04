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
      <h1>👋 Welcome, {currentUser.fullname}</h1>
      <p className="subtitle">Here's some wonderfully pointless information for your enjoyment:</p>
      <div className="info-grid">
        <div className="info-card">🌍 Earth spins at 1,000 mph.</div>
        <div className="info-card">🧠 You use 100% of your brain, just not all at once.</div>
        <div className="info-card">📡 Wi-Fi stands for nothing at all.</div>
      </div>
      <button className="logout-btn" onClick={logout}>🚪 Logout</button>
    </div>
  );
};

export default Dashboard;