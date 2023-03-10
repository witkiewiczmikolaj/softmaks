import React, { useState } from 'react';
import Home from './Home';
import ModalRegister from './modals/ModalRegister';
import "./LoginScreen.css";

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [openhome, setOpenhome] = useState(false);
    const [openregister, setOpenregister] = useState(false);
    
    const handleEmailChange = (e) => {
            setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
            setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        setResponse(null);
        e.preventDefault();
        try{
        const response_login = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(email + ':' + password) },
            body: JSON.stringify({email: email, pass: password}),
        });
        const login = await response_login.json();
        
        if (login === true) {
            setOpenhome(true);
        } else {
            setResponse("Nieprawidłowe dane do logowania");
        }} catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {openhome && <Home password={password} email={email} closehome={setOpenhome}/>}
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
            <div className='footer_reg'>
                <button className='register' onClick={() => {setOpenregister(true)}}>Zarejestruj się</button>
            </div>
            {openregister && <ModalRegister closeModal={setOpenregister}/>}
            <div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        </div>
        
  );
}

export default LoginScreen;