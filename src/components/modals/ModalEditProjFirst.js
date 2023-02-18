import React, { useState, useEffect }  from "react";
import "./ModalEdit.css";
import ModalEditProjSecond from "./ModalEditProjSecond";

function ModalEditProjFirst( props ) {
    const [projectdata, setProjectdata] = useState([[]]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [status, setStatus] = useState('');
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        }; 

    useEffect(() => {
        async function fetchData() {
            const response_data = await fetch('http://localhost:5000/api/get_project_data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: props.id}),
            });
            const project_data_response = await response_data.json();
            setProjectdata(project_data_response);
        }
        fetchData();
        }, [props.closemodal]);

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
                                placeholder={"Nazwa: " + projectdata?.[0]?.[1]}
                                value={name}
                                onChange={handleNameChange}
                                required
                            /><br></br>
                            <input
                                type="text"
                                placeholder={"Opis: " + projectdata?.[0]?.[2]}
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            /><br></br>
                            <label>Stara data rozpoczęcia: {projectdata?.[0]?.[3]}</label>
                            <input
                                type="date"
                                value={start}
                                onChange={handleStartChange}
                                required
                            /><br></br>
                            <label>Stara data zakończenia: {projectdata?.[0]?.[4]}</label>
                            <input
                                type="date"
                                value={end}
                                onChange={handleEndChange}
                                required
                            /><br></br>
                            <input
                                list="statuslist"
                                placeholder={"Status: " + projectdata?.[0]?.[5]}
                                value={status}
                                onChange={handleStatusChange}
                                required
                            /><br></br>
                            <datalist id="statuslist">
                                <option value="NOWY"/>
                                <option value="W TRAKCIE"/>
                                <option value="ZAKOŃCZONY"/>
                            </datalist>
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
            {openmodal && <ModalEditProjSecond 
            closeModal1={setOpenmodal} 
            closeModal2={props.closemodal}
            name={name}
            description={description}
            start={start}
            end={end}
            status={status}
            id={props.id}
            />}
        </div>
    );
};

export default ModalEditProjFirst;
