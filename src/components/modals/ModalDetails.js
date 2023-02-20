import React, { useState, useEffect }  from "react";
import "./ModalEdit.css";

function ModalDetails( props ) {

    const [projectdetails, setProjectdetails] = useState([[]]);

    useEffect(() => {
        async function fetchData() {
            const response_data = await fetch('http://localhost:5000/api/get_project_details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: props.id}),
            });
            const project_details_response = await response_data.json();
            setProjectdetails(project_details_response);
            
        }
        fetchData();
    }, []);

    let sorted_comments = []
    if (projectdetails[2] != undefined) {
        sorted_comments = projectdetails[2].sort((a, b) => new Date(a.date) - new Date(b.date))
    } else {
        sorted_comments = []
    }
   
    return (
        <div>
            <div className="modal_bg_first">  
                <div className="modal_container_det">
                    <div className="title">
                        <h1>Szczegóły projektu:</h1>
                    </div>
                    <div className="body">
                        <p>Nazwa: {projectdetails[0][1]}</p>
                        <p>Opis: {projectdetails[0][2]}</p>
                        <p>Data rozpoczęcia: {projectdetails[0][3]}</p>
                        <p>Data zakończenia: {projectdetails[0][4]}</p>
                        <p>Lista użytkowników:</p>
                        <p className="users">{projectdetails[1]}</p>
                        <p>Status: {projectdetails[0][5]}</p>
                        <p>Twórca projektu: {projectdetails?.[3]?.[0]} {projectdetails?.[3]?.[1]}</p>
                        <br></br>
                            <h2>Komentarze:</h2>
                                <ul>
                                    {sorted_comments.map((comment, index) =>(
                                        <li key={index}>
                                            <p className={projectdetails[4][index] ? 'is_owner' : '' }>{comment[0]}</p>
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
