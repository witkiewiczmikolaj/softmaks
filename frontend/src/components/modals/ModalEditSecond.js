import React, { useEffect } from "react";
import "./ModalEdit.css";

function ModalEditSecond(props) {

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/update_user_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: props.uname, surname: props.usurname, password: props.password, age: props.age, sex: props.sex, email: props.email, number: props.number, oldemail: props.oldemail}),
        });
        props.closeModal2(false)
        props.closehome(false)
        };
        useEffect(() => {
            let toggle = () => {

                let element = document.getElementById("submit_button_second");
            
                if (props.uname === '' || 
                props.usurname === '' || 
                props.password === '' || 
                props.age === '' || 
                props.sex === '' || 
                props.email === '') {
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
                            placeholder={props.uname}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.usurname}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.password}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.age}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.sex}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.email}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.number}
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

export default ModalEditSecond;
