import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginScreen.css";

function LoginScreen(props) {
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

    function set_data(input){
        props.data(input)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response_login = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email, pass: password}),
        });
        const login = await response_login.json();

        const response_data = await fetch('http://localhost:5000/api/get_user_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email}),
        });
        const data = await response_data.json();
        
        if (login === true) {
            navigate('/home');
            set_data(data);
        } else {
            setResponse(login);
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
                    placeholder="Hasło"
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