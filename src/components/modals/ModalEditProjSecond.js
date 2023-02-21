import React, { useEffect } from "react";
import "./ModalEdit.css";

function ModalEditProjSecond(props) {

const data_props = [props.name, props.description, props.start, props.end, props.status, props.id];

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5000/api/update_project_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data: data_props}),
        });
        const data = await response.json();
        console.log(data)
        props.closeModal2(false)
        };
        useEffect(() => {
            let toggle = () => {

                let element = document.getElementById("submit_button_second");
            
                if (props.name === '' || 
                props.description === '' || 
                props.start === '' || 
                props.end === '' || 
                props.status === ''
                ) {
                   element.setAttribute("hidden", "hidden");
                } else {
                    element.removeAttribute("hidden");
                }
              }
              toggle();
          });
        
    return (
        <div className="modal_bg_second">  
            <div className="modal_container">
                <div className="title">
                    <h1>Sprawdź poprawność danych:</h1>
                </div>
                <div className="body">
                    <form onSubmit={handleSubmitUpdate}>
                        <input
                            type="text"
                            placeholder={props.name}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.description}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.start}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.end}
                            disabled
                        /><br></br>
                        <p className="users">{props.users}</p>
                        <input
                            type="text"
                            placeholder={props.status}
                            disabled
                        /><br></br>
                        <div className="footer">
                            <button id="cancel_button" onClick={() => props.closeModal2(false)}>Anuluj</button>
                            <button id="back_button" onClick={() => props.closeModal1(false)}>Powrót</button>
                            <button id="submit_button_second">Wykonaj</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditProjSecond;
