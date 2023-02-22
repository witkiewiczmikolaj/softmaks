import React from "react";
import "./ModalEdit.css";

function ModalDeleteSecond(props) {

    const handleDelete = async () => {
        
        const response = await fetch('/api/delete_project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: props.id}),
        });
        const data = await response.json();
        console.log(data)
        props.closeModal2(false)
        };

    return (
        <div className="modal_bg_second">  
            <div className="modal_container">
                <div className="title">
                    <h1>UWAGA! Wszystkie dane zostaną usunięte. Czy na pewno chcesz kontynuować?</h1>
                </div>
                <div className="body">
                    <div className="footer">
                        <button id="cancel_button" onClick={() => props.closeModal2(false)}>Anuluj</button>
                        <button id="back_button" onClick={() => props.closeModal1(false)}>Powrót</button>
                        <button id="submit_button_second" onClick={handleDelete}>Wykonaj</button>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteSecond;
