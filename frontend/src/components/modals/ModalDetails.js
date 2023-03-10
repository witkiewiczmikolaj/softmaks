import React, { useState, useEffect }  from "react";
import "./ModalEdit.css";

function ModalDetails( props ) {

    const [projectdetails, setProjectdetails] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response_data = await fetch('/api/get_project_details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(props.email + ':' + props.password) },
                body: JSON.stringify({id: props.id}),
            });
            const project_details_response = await response_data.json();
            setProjectdetails(project_details_response);
        }
        fetchData();
    }, []);

    let sorted_comments = []
    let users = []
    if (projectdetails.comments != undefined) {
        sorted_comments = projectdetails.comments[0].sort((a, b) => new Date(a.date) - new Date(b.date))
        users = projectdetails.currentusers[0].map((user) =>(user + ", "))
    } else {
        sorted_comments = []
        users = []
    }
   
    return (
        <div>
            <div className="modal_bg_first">  
                <div className="modal_container_det">
                    <div className="title">
                        <h1>Szczegóły projektu:</h1>
                    </div>
                    <div className="body">
                        <p>Nazwa: {projectdetails.name}</p>
                        <p className="description">Opis: {projectdetails.description}</p>
                        <p>Data rozpoczęcia: {projectdetails.start}</p>
                        <p>Data zakończenia: {projectdetails.end}</p>
                        <p>Lista użytkowników:</p>
                        <p className="users">{users}</p>
                        <p>Status: {projectdetails.status}</p>
                        <p>Twórca projektu: {projectdetails?.ownerdata?.[0]?.[0]} {projectdetails?.ownerdata?.[0]?.[1]}</p>
                        <br></br>
                            <h2>Komentarze:</h2>
                                <ul>
                                    {sorted_comments.map((comment, index) =>(
                                        <li key={index}>
                                            <p className={projectdetails.isowner[0][index] ? 'is_owner' : 'comment' }>{comment[0]}</p>
                                            <p><b>Dodane przez: {comment[2]} {comment[4]}, dnia: {comment[1]}</b></p>
                                        </li>
                                    ))}
                                </ul>
                        <div className="footer">
                            <button id="cancel_button" onClick={() => props.closemodal(false)}>Anuluj</button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDetails;
