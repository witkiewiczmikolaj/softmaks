import React, { useState } from 'react';
import Home from './Home';
import "./LoginScreen.css";

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [openhome, setOpenhome] = useState(false);
    
    const handleEmailChange = (e) => {
            setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
            setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response_login = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email, pass: password}),
        });
        const login = await response_login.json();
        
        if (login === true) {
            setOpenhome(true);
            setPassword('');
        } else {
            setResponse(login);
        }} catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {openhome && <Home email={email} closehome={setOpenhome}/>}
            <form className='loginscreen_form' onSubmit={handleSubmit}>
                <h1 className='welcome'>Zaloguj się:</h1>
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
                <button type="submit">Zatwierdź</button>
                {response ? <p>{response}</p> : <p></p>}
            </form>
            <div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        </div>
        
  );
}

export default LoginScreen;