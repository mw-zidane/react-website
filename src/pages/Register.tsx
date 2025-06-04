import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const emailExists = users.some((u: any) => u.email === email);
  if (emailExists) {
    setError('Email already registered');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10); // 🔐 hash password

  const newUser = { email, password: hashedPassword, fullname };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  setSuccess('Account created! You can now login.');
  setTimeout(() => navigate('/login'), 1500);
};

  return (
    <div className="auth-container">
      <h2>📝 Register</h2>
      <form onSubmit={handleRegister} className="form">
        <input type="text" placeholder="Full Name" value={fullname} onChange={e => setFullname(e.target.value)} required />
        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Choose a password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {success && <div className="modal success-modal">✅ Registered successfully! Redirecting...</div>}
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;