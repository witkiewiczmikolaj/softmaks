import React, { useState, useEffect } from 'react'
import "./Navbar.css";
import ModalEditFirst from "./modals/ModalEditFirst";

function Navbar(props) {

  const [openmodal, setOpenmodal] = useState(false);
  const [data, setData] = useState([[]]);

  useEffect(() => {
    async function fetchData() {
        const response_data = await fetch('http://localhost:5000/api/get_user_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: props.email}),
        });
        const data_response = await response_data.json();
        setData(data_response);
    }
    fetchData();
  }, [openmodal]);

  return (
    <div>
        <nav>
            <div className='message'>
                {data[0][0] ? <p>Hello {data[0][0]}!</p> : <p></p>}
            </div>
            <div className='buttons'>
                <button
                  className="userpanel_button"
                  onClick={() => {
                      setOpenmodal(true);
                  }}
                >
                  Zmień dane
                </button>
                {openmodal && <ModalEditFirst closeModal={setOpenmodal} data={data}/>}
                <button className='logout_button' onClick={() => {props.closehome(false)}}>Wyloguj</button>
            </div>
        </nav>
    </div>
  );
}

export default Navbar