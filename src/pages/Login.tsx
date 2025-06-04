import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      setError('Email not found');
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      setError('Invalid password');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <h2>🔐 Sign In</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <div className="modal error-modal">{error}</div>}
      </form>
      <p>Don't have an account? <a href="/register">Create one</a></p>
    </div>
  );
};

export default Login;
