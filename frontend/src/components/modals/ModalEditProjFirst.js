import React, { useState, useEffect }  from "react";
import "./ModalEdit.css";
import Select from 'react-select'
import ModalEditProjSecond from "./ModalEditProjSecond";

function ModalEditProjFirst( props ) {
    const [projectdata, setProjectdata] = useState([]);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [status, setStatus] = useState('');
    const [usersfinal, setUsersfinal] = useState([]);
    const [openmodal, setOpenmodal] = useState(false);
    const [disable, setDisable] = useState(true);

    if (start > end) {
        setEnd(start);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleStartChange = (e) => {
        setStart(e.target.value);
        setDisable(false);
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
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(props.email + ':' + props.password) },
                body: JSON.stringify({id: props.id}),
            });
            const project_data_response = await response_data.json();
            setProjectdata(project_data_response);
            const users_select = project_data_response.allusers[0] ? project_data_response.allusers[0].map((users_response) => ( { value: users_response, label: users_response })) : { value: '', label: '' };
            setUsers(users_select);
            setName(project_data_response.name);
            setDescription(project_data_response.description);
            setStatus(project_data_response.status);
        }
        fetchData();
        }, [props.closemodal]);

        let users_array = []
        if (projectdata.currentusers != undefined) {
            users_array = projectdata.currentusers[0].map((user) =>(user + ", "))
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
                                value={name}
                                onChange={handleNameChange}
                            /><br></br>
                            <input
                                type="text"
                                placeholder={"Opis:"}
                                value={description}
                                onChange={handleDescriptionChange}
                            /><br></br>
                            <label>Stara data rozpocz??cia: {projectdata.start}</label>
                            <input
                                type="date"
                                value={start}
                                onChange={handleStartChange}
                            /><br></br>
                            <label>Stara data zako??czenia: {projectdata.end}</label>
                            <input
                                type="date"
                                value={end}
                                onChange={handleEndChange}
                                min={start}
                                disabled={disable}
                            /><br></br>
                            <label>Stary wyb??r u??ytkownik??w:</label>
                            <p className="users">{users_array}</p>
                            <div className="select_div">
                                <Select isMulti onChange={handleUsersChange} options={users} classNamePrefix="select"/>
                            </div>
                            <input
                                list="statuslist"
                                placeholder={"Status:"}
                                value={status}
                                onChange={handleStatusChange}
                            /><br></br>
                            <datalist id="statuslist">
                                <option value="NOWY"/>
                                <option value="W TRAKCIE"/>
                                <option value="ZAKO??CZONY"/>
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
            password={props.password}
            id={props.id}
            />}
        </div>
    );
};

export default ModalEditProjFirst;
