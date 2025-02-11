import React, { useState, useContext } from 'react';
import Button from '../UiComponents/Button';
import InputField from '../UiComponents/InputField';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';

const Login = () => {
  const { login } = useContext(TodoContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) return;
    login(email, password);
    navigate('/app/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111C2E] px-6">
      <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
      <div className="w-full max-w-[350px] space-y-4">
        <InputField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white shadow-md text-gray-900 focus:outline-none"
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white shadow-md text-gray-900 focus:outline-none"
        />
        <Button
          text="Login"
          onClick={handleSubmit}
          className="w-full py-3 transition-all"
        />
      </div>
    </div>
  );
};

export default Login;
