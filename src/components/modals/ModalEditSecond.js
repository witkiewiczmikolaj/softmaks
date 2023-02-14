import React from "react";
import "./ModalEdit.css";

function ModalEditSecond(props) {
const data_props = [props.uname, props.usurname, props.password, props.age, props.sex, props.email, props.number]
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await fetch('http://localhost:5000/api/update_user_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data: data_props}),
        });
        const data = await response.json();
        console.log(data)
        props.closeModal2(false)
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="modal_bg">  
            <div className="modal_container">
                <div className="title">
                    <h1>Sprawdź poprawność danych:</h1>
                </div>
                <div className="body">
                    <form>
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
                            type="password"
                            placeholder={props.password}
                            disabled
                        /><br></br>
                        <input
                            type="number"
                            placeholder={props.age}
                            disabled
                        /><br></br>
                        <input
                            type="text"
                            placeholder={props.sex}
                            disabled
                        /><br></br>
                        <input
                            type="email"
                            placeholder={props.email}
                            disabled
                        /><br></br>
                        <input
                            type="number"
                            placeholder={props.number}
                            disabled
                        /><br></br>
                        <div className="footer">
                            <button id="cancel_button" onClick={() => props.closeModal2(false)}>Anuluj</button>
                            <button id="back_button" onClick={() => props.closeModal1(false)}>Powrót</button>
                            <button id="submit_button" type="submit" onClick={handleSubmit}>Dalej</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditSecond;
