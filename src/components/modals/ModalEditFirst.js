import React, { useState, useEffect }  from "react";
import "./ModalEdit.css";
import ModalEditSecond from "./ModalEditSecond";

function ModalEditFirst({ closeModal }) {
    const [uname, setUname] = useState('');
    const [usurname, setUsurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState('');
    const [number, setNumber] = useState(0);
    const [openmodal, setOpenmodal] = useState(false);

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
/*
    const [projects, setProjects] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/api/get_user');
            const projects = await response.json();
            setProjects(projects);
        }
        fetchData();
      }, []);
*/
    return (
        <div>
            <div className="modal_bg">  
                <div className="modal_container">
                    <div className="title">
                        <h1>Zaktualizuj dane:</h1>
                    </div>
                    <div className="body">
                        <form>
                            <input
                                type="text"
                                placeholder="Imię"
                                value={uname}
                                onChange={handleUnameChange}
                            /><br></br>
                            <input
                                type="text"
                                placeholder="Nazwisko"
                                value={usurname}
                                onChange={handleUsurnameChange}
                            /><br></br>
                            <input
                                type="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={handlePasswordChange}
                            /><br></br>
                            <input
                                type="number"
                                placeholder="Wiek"
                                value={age}
                                onChange={handleAgeChange}
                                min={1}
                                max={200}
                            /><br></br>
                            <input
                                type="text"
                                placeholder="Płeć"
                                value={sex}
                                onChange={handleSexChange}
                            /><br></br>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            /><br></br>
                            <input
                                type="number"
                                placeholder="Numer Telefonu"
                                value={number}
                                onChange={handleNumberChange}
                                min={100000000}
                                max={999999999}
                            /><br></br>
                            <div className="footer">
                                <button id="cancel_button" onClick={() => closeModal(false)}>Anuluj</button>
                                <button 
                                className="open_modal_button"
                                onClick={() => {
                                    setOpenmodal(true);
                                }} 
                                type="submit">Dalej</button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
            {openmodal && <ModalEditSecond 
            closeModal1={setOpenmodal} 
            closeModal2={closeModal}
            uname={uname}
            usurname={usurname}
            email={email}
            password={password}
            sex={sex}
            age={age}
            number={number}
            />}
        </div>
        
    );
};

export default ModalEditFirst;
