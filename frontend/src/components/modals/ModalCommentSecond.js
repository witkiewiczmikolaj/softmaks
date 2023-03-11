import React, { useState, useEffect } from "react";
import "./ModalEdit.css";

function ModalCommentSecond(props) {

const [currentTime, setCurrentTime] = useState("");

const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/add_comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(props.email + ':' + props.password) },
        body: JSON.stringify({comment: props.comment, id: props.id, email: props.email, time: currentTime}),
    });
    props.closeModal2(false);
    props.opendetail(true);
    };

useEffect(() => {
    let toggle = () => {

        let element = document.getElementById("submit_button_second");
    
        if (props.comment === '') {
            element.setAttribute("hidden", "hidden");
        } else {
            element.removeAttribute("hidden");
        }
        }
        toggle();
    setInterval(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}`);
        });
    }, []);
        
    return (
        <div className="modal_bg_second">  
            <div className="modal_container">
                <div className="title">
                    <h1>Czy chcesz dodać ten komentarz?</h1>
                </div>
                <div className="body">
                    <form onSubmit={handleSubmitUpdate}>
                        <textarea
                            type="text"
                            placeholder={props.comment}
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

export default ModalCommentSecond;
