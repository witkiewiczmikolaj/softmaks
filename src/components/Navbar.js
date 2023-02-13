import React, { useState, useEffect } from 'react'
import "./Navbar.css";
import ModalEditFirst from "./modals/ModalEditFirst";

function Navbar() {
  const [data, setData] = useState();
  const [openmodal, setOpenmodal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/api/get_name');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
        <nav>
            <div className='message'>
                {data ? <p>{data.message}</p> : <p></p>}
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
                {openmodal && <ModalEditFirst closeModal={setOpenmodal} />}
                <button>Logout</button>
            </div>
        </nav>
    </div>
  );
}

export default Navbar