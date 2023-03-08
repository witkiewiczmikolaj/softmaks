import React, { useState, useEffect }  from "react";
import "./ModalEdit.css";
import Select from 'react-select'
import ModalEditProjSecond from "./ModalEditProjSecond";

function ModalEditProjFirst( props ) {
    const [projectdata, setProjectdata] = useState([]);
    const [name, setName] = useState(projectdata?.[0]?.[0]?.[1]);
    const [description, setDescription] = useState(projectdata?.[0]?.[0]?.[2]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [status, setStatus] = useState(projectdata?.[0]?.[0]?.[5]);
    const [users, setUsers] = useState([]);
    const [usersfinal, setUsersfinal] = useState([]);
    const [openmodal, setOpenmodal] = useState(false);

    const handleNameChange = (e) => {
            setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
            setDescription(e.target.value);
    };

    const handleStartChange = (e) => {
            setStart(e.target.value);
    };

    const handleEndChange = (e) => {
            setEnd(e.target.value);
    };
    
    const handleStatusChange = (e) => {
            setStatus(e.target.value);
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
            const response_data = await fetch('/api/get_project_data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: props.id}),
            });
            const project_data_response = await response_data.json();
            setProjectdata(project_data_response);
            const users_select = project_data_response[1] ? project_data_response[1].map((users_response) => ( { value: users_response, label: users_response })) : { value: '', label: '' };
            setUsers(users_select);
        }
        fetchData();
        }, [props.closemodal]);

        let users_array = []
        if (projectdata[2] != undefined) {
            users_array = projectdata[2].map((user) =>(user + ", "))
        } else {
            users_array = []
        }
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
                                placeholder={"Nazwa:"}
                                value={projectdata?.[0]?.[0]?.[1] ?? name}
                                onChange={handleNameChange}
                            /><br></br>
                            <input
                                type="text"
                                placeholder={"Opis:"}
                                value={projectdata?.[0]?.[0]?.[2] ?? description}
                                onChange={handleDescriptionChange}
                            /><br></br>
                            <label>Stara data rozpoczęcia: {projectdata?.[0]?.[0]?.[3]}</label>
                            <input
                                type="date"
                                value={start}
                                onChange={handleStartChange}
                            /><br></br>
                            <label>Stara data zakończenia: {projectdata?.[0]?.[0]?.[4]}</label>
                            <input
                                type="date"
                                value={end}
                                onChange={handleEndChange}
                            /><br></br>
                            <label>Stary wybór użytkowników:</label>
                            <p className="users">{users_array}</p>
                            <div className="select_div">
                                <Select isMulti onChange={handleUsersChange} options={users} classNamePrefix="select"/>
                            </div>
                            <input
                                list="statuslist"
                                placeholder={"Status:"}
                                value={projectdata?.[0]?.[0]?.[5] ?? status}
                                onChange={handleStatusChange}
                            /><br></br>
                            <datalist id="statuslist">
                                <option value="NOWY"/>
                                <option value="W TRAKCIE"/>
                                <option value="ZAKOŃCZONY"/>
                            </datalist>
                            <div className="footer_edit">
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
            {openmodal && <ModalEditProjSecond 
            closeModal1={setOpenmodal} 
            closeModal2={props.closemodal}
            name={name}
            description={description}
            start={start}
            end={end}
            users={usersfinal}
            status={status}
            email={props.email}
            id={props.id}
            />}
        </div>
    );
};

export default ModalEditProjFirst;
