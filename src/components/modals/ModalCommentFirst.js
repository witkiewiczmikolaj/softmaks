import React, { useState }  from "react";
import "./ModalComment.css";
import ModalCommentSecond from "./ModalCommentSecond";

function ModalCommentFirst( props ) {
    const [comment, setComment] = useState('');
    const [openmodal, setOpenmodal] = useState(false);

    const handleCommentChange = (e) => {
            setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        }; 

    return (
        <div>
            <div className="modal_bg_first">  
                <div className="modal_container">
                    <div className="title">
                        <h1>Dodaj komentarz:</h1>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit}>
                            <textarea
                                type="textarea"
                                placeholder={"Treść komentarza"}
                                value={comment}
                                onChange={handleCommentChange}
                                required
                            /><br></br>
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
            {openmodal && <ModalCommentSecond 
            closeModal1={setOpenmodal} 
            closeModal2={props.closemodal}
            comment={comment}
            id={props.id}
            email={props.email}
            />}
        </div>
        
    );
};

export default ModalCommentFirst;
