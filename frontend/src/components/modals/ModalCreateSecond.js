import React, { useEffect } from "react";

function ModalCreateSecond(props) {

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/create_project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(props.email + ':' + props.password) },
            body: JSON.stringify({name: props.name, description: props.description, start: props.startdate, end: props.enddate, users: props.users, email: props.email}),
        });
        props.closeModal2(false)
        };
        
    useEffect(() => {
        let toggle = () => {

            let element = document.getElementById("submit_button_second");
        
            if (props.name === '' || 
            props.description === '' || 
            props.startdate === '' || 
            props.enddate === '' || 
            props.users === '') {
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
                            placeholder={props.startdate}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.enddate}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.users}
                            disabled
                        /><br></br>
                        <br></br>
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

export default ModalCreateSecond;
