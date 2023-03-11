import React, { useState, useEffect } from 'react'
import "./Navbar.css";
import ModalEditFirst from "./modals/ModalEditFirst";

function Navbar(props) {

  const [openmodal, setOpenmodal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const response_data = await fetch('/api/get_user_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(props.email + ':' + props.password)},
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
                {data.name ? <p>Witaj {data.name}!</p> : <p></p>}
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
                {openmodal && <ModalEditFirst email={props.email} password={props.password} closehome={props.closehome} closeModal={setOpenmodal} data={data} oldemail={props.email}/>}
                <button className='logout_button' onClick={() => {props.closehome(false)}}>Wyloguj</button>
            </div>
        </nav>
    </div>
  );
}

export default Navbar