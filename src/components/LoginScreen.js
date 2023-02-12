import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginScreen.css";

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
        setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
        setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email, pass: password}),
    });
    const data = await response.json();
    if (data === true) {
        navigate('/home');
    } else {
        setResponse(data);
    }} catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
        <form className='loginscreen_form' onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
            {response ? <p>{response}</p> : <p></p>}
        </form>
    </div>
    
  );
}

export default LoginScreen;