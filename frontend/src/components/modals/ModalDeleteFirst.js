import React, { useState }  from "react";
import "./ModalEdit.css";
import ModalDeleteSecond from "./ModalDeleteSecond";

function ModalDeleteFirst( props ) {
    const [openmodal, setOpenmodal] = useState(false);
        
    return (
        <div>
            <div className="modal_bg_first">  
                <div className="modal_container">
                    <div className="title">
                        <h1>Usunąć projekt?</h1>
                    </div>
                    <div className="body">
                        <div className="footer">
                            <button id="cancel_button" onClick={() => props.closemodal(false)}>Anuluj</button>
                            <button 
                            id="submit_button"
                            onClick={() => {
                                setOpenmodal(true);
                            }} 
                            type="submit">Dalej</button>
                        </div> 
                    </div>
                </div>
            </div>
            {openmodal && <ModalDeleteSecond 
            closeModal1={setOpenmodal} 
            closeModal2={props.closemodal}
            id={props.id}
            password={props.password}
            email={props.email}
            />}
        </div>
        
    );
};

export default ModalDeleteFirst;
