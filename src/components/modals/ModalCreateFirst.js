import React, { useState }  from "react";
//import Select from 'react-select'
import "./ModalEdit.css";
import ModalCreateSecond from "./ModalCreateSecond";

function ModalEditFirst( props ) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const [users, setUsers] = useState('');
    const [openmodal, setOpenmodal] = useState(false);

    const handleNameChange = (e) => {
            setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
            setDescription(e.target.value);
    };

    const handleStartdateChange = (e) => {
            setStartdate(e.target.value);
    };

    const handleEnddateChange = (e) => {
            setEnddate(e.target.value);
    };
    
    const handleUsersChange = (e) => {
            setUsers(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        }; 

    return (
        <div>
            <div className="modal_bg">  
                <div className="modal_container">
                    <div className="title">
                        <h1>Podaj dane projektu:</h1>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder={"Nazwa" }
                                value={name}
                                onChange={handleNameChange}
                                required
                            /><br></br>
                            <input
                                type="text"
                                placeholder={"Opis"}
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            /><br></br>
                            <label for="start_date">Data rozpoczęcia:</label>
                            <input
                                name="start_date"
                                type="date"
                                value={startdate}
                                onChange={handleStartdateChange}
                                required
                            /><br></br>
                            <label for="peas">Data zakończenia:</label>
                            <input
                                name="end_date"
                                type="date"
                                value={enddate}
                                onChange={handleEnddateChange}
                                required
                            /><br></br>
                            <select multiple> 
                                <option value="value1">Option 1</option>
                                <option value="value2">Option 2</option>
                                <option value="value3">Option 3</option>
                            </select>
                            
                            <br></br>
                            <div className="footer">
                                <button id="cancel_button" onClick={() => props.closemodal(false)}>Anuluj</button>
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
            {openmodal && <ModalCreateSecond 
            closeModal1={setOpenmodal} 
            closeModal2={props.closemodal}
            name={name}
            description={description}
            startdate={startdate}
            enddate={enddate}
            users={users}
            email={props.data[0][5]}
            />}
        </div>
        
    );
};

export default ModalEditFirst;
