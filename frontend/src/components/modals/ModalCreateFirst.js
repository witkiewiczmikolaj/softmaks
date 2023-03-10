import React, { useState, useEffect }  from "react";
import Select from 'react-select'
import ModalCreateSecond from "./ModalCreateSecond";

function ModalEditFirst( props ) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const [users, setUsers] = useState([]);
    const [usersfinal, setUsersfinal] = useState([]);
    const [openmodal, setOpenmodal] = useState(false);
    const [disable, setDisable] = useState(true);

    if (startdate > enddate) {
        setEnddate(startdate);
    }

    const handleNameChange = (e) => {
            setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
            setDescription(e.target.value);
    };

    const handleStartdateChange = (e) => {
            setStartdate(e.target.value);
            setDisable(false);
    };

    const handleEnddateChange = (e) => {
            setEnddate(e.target.value);
    };
    
    const handleUsersChange = (e) => {
            let users_array = []
            for(let i=0; i<e.length; i++) {
                users_array.push(e[i]["value"])
            }
            setUsersfinal(users_array);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        }; 

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/get_users');
            const users_response = await response.json();
            users_response.splice(users_response.indexOf(props.email), 1);

            const users_select = users_response ? users_response.map((users_response) => ( { value: users_response, label: users_response })) : { value: '', label: '' };
            setUsers(users_select);
        }
        fetchData();
        }, []);
        
    return (
        <div>
            <div className="modal_bg_first">  
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
                            <label>Data rozpocz??cia:</label>
                            <input
                                type="date"
                                value={startdate}
                                onChange={handleStartdateChange}
                                required
                            /><br></br>
                            <label>Data zako??czenia:</label>
                            <input
                                type="date"
                                value={enddate}
                                onChange={handleEnddateChange}
                                min={startdate}
                                disabled={disable}
                                required
                            /><br></br>
                            <label>Dodaj u??ykownik??w:</label>
                            <div className="select_div">
                                <Select isMulti onChange={handleUsersChange} options={users} classNamePrefix="select"/>
                            </div>
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
            users={usersfinal}
            email={props.email}
            password={props.password}
            />}
        </div>
        
    );
};

export default ModalEditFirst;
