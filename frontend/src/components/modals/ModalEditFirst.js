import React, { useState }  from "react";
import "./ModalEdit.css";
import ModalEditSecond from "./ModalEditSecond";

function ModalEditFirst( props ) {
    const [uname, setUname] = useState(props.data?.[0]?.[0]);
    const [usurname, setUsurname] = useState(props.data?.[0]?.[1]);
    const [email, setEmail] = useState(props.data?.[0]?.[5]);
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(props.data?.[0]?.[3]);
    const [sex, setSex] = useState(props.data?.[0]?.[4]);
    const [number, setNumber] = useState(props.data?.[0]?.[6]);
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        }; 

    return (
        <div>
            <div className="modal_bg_first">  
                <div className="modal_container">
                    <div className="title">
                        <h1>Zaktualizuj dane:</h1>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder={"Imię:"}
                                value={uname}
                                onChange={handleUnameChange}
                                required
                            /><br></br>
                            <input
                                type="text"
                                placeholder={"Nazwisko:"}
                                value={usurname}
                                onChange={handleUsurnameChange}
                                required
                            /><br></br>
                            <input
                                type="password"
                                placeholder="Nowe hasło:"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            /><br></br>
                            <input
                                type="number"
                                placeholder={"Wiek:"}
                                value={age}
                                onChange={handleAgeChange}
                                required
                                min={1}
                                max={200}
                            /><br></br>
                            <input
                                list="sexlist"
                                placeholder={"Płeć:"}
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
                                type="text"
                                placeholder={"Email:"}
                                value={email}
                                onChange={handleEmailChange}
                                required
                            /><br></br>
                            <input
                                type="number"
                                placeholder={"Numer telefonu:"}
                                value={number}
                                onChange={handleNumberChange}
                                min={100000000}
                                max={999999999}
                            /><br></br>
                            <div className="footer">
                                <button id="cancel_button" onClick={() => props.closeModal(false)}>Anuluj</button>
                                <button 
                                id="submit_button"
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
            closeModal2={props.closeModal}
            closehome={props.closehome}
            uname={uname}
            usurname={usurname}
            email={email}
            password={password}
            sex={sex}
            age={age}
            number={number}
            oldemail={props.data?.[0]?.[5]}
            />}
        </div>
        
    );
};

export default ModalEditFirst;
