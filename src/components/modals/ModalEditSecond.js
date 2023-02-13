import React, { useState, useEffect }  from "react";
import "./ModalEdit.css";

function ModalEditSecond(props) {
    const [uname, setUname] = useState('');
    const [usurname, setUsurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState('');
    const [number, setNumber] = useState(0);
    const [openmodal, setOpenmodal] = useState(false);

    
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
        <div className="modal_bg">  
            <div className="modal_container">
                <div className="title">
                    <h1>Sprawdź poprawność danych:</h1>
                </div>
                <div className="body">
                    <form>
                        <input
                            type="text"
                            placeholder={props.uname}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.usurname}
                            value={usurname}
                            disabled
                        /><br></br>
                        <input
                            type="password"
                            placeholder={props.password}
                            disabled
                        /><br></br>
                        <input
                            type="number"
                            placeholder={props.age}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.sex}
                            disabled
                        /><br></br>
                        <input
                            type="email"
                            placeholder={props.email}
                            disabled
                        /><br></br>
                        <input
                            type="number"
                            placeholder={props.number}
                            disabled
                        /><br></br>
                        <div className="footer">
                            <button id="cancel_button" onClick={() => props.closeModal2(false)}>Anuluj</button>
                            <button id="back_button" onClick={() => props.closeModal1(false)}>Powrót</button>
                            <button type="submit" onClick={() => props.closeModal2(false)}>Dalej</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditSecond;
