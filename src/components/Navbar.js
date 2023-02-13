import React, { useState } from 'react'
import "./Navbar.css";
import ModalEditFirst from "./modals/ModalEditFirst";

function Navbar(props) {

  const [openmodal, setOpenmodal] = useState(false);

  return (
    <div>
        <nav>
            <div className='message'>
                {props.data[0][0] ? <p>Hello {props.data[0][0]}!</p> : <p></p>}
            </div>
            <div className='buttons'>
                <button
                  className="open_modal_button"
                  onClick={() => {
                      setOpenmodal(true);
                  }}
                >
                  User Panel
                </button>
                {openmodal && <ModalEditFirst closeModal={setOpenmodal} data={props.data}/>}
                <button>Logout</button>
            </div>
        </nav>
    </div>
  );
}

export default Navbar