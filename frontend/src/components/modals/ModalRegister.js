import React, { useState } from 'react';
import "./ModalEdit.css";

function ModalRegister( props ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uname, setUname] = useState('');
    const [usurname, setUsurname] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [number, setNumber] = useState('');
    const [response, setResponse] = useState(null);
    
    const handleEmailChange = (e) => {
            setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
            setPassword(e.target.value);
    };

    const handleUnameChange = (e) => {
        setUname(e.target.value);
    };

    const handleUsurnameChange = (e) => {
            setUsurname(e.target.value);
    };

    const handleAgeChange = (e) => {
            setAge(e.target.value);
    };

    const handleSexChange = (e) => {
            setSex(e.target.value);
    };

    const handleNumberChange = (e) => {
            setNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response_register = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email, pass: password, name: uname, surname: usurname, age: age, sex: sex, number: number}),
        });
        const register = await response_register.json();
        console.log(register)
        if (register === true) {
            props.closeModal(false);
        } else {
            setResponse(register);
        }} catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="modal_bg_first">  
                <div className="modal_container">
                    <div className="title">
                        <h1>Zarejestruj się:</h1>
                    </div>
                    <div className="body"></div>
                        <form className='registerscreen_form' onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Imię:"
                                value={uname}
                                onChange={handleUnameChange}
                                required
                            /><br></br>
                            <input
                                type="text"
                                placeholder="Nazwisko:"
                                value={usurname}
                                onChange={handleUsurnameChange}
                                required
                            /><br></br>
                            <input
                                type="number"
                                placeholder="Wiek:"
                                value={age}
                                onChange={handleAgeChange}
                                required
                                min={1}
                                max={200}
                            /><br></br>
                            <input
                                list="sexlist"
                                placeholder="Płeć:"
                                value={sex}
                                onChange={handleSexChange}
                                required
                            />
                            <datalist id="sexlist">
                                <option value="Mężczyzna"/>
                                <option value="Kobieta"/>
                            </datalist>
                            <br></br>
                            <input
                                type="number"
                                placeholder="Numer telefonu:"
                                value={number}
                                onChange={handleNumberChange}
                                min={100000000}
                                max={999999999}
                            /><br></br>
                            <div className="footer">
                                <button id="cancel_button" onClick={() => props.closeModal(false)}>Anuluj</button>
                                <button id="submit_button" type='submit'>Dalej</button>
                            </div> 
                            {response ? <p>{response}</p> : <p></p>}
                        </form>                    
                </div>
            </div>
        </div>
        
  );
}

export default ModalRegister;