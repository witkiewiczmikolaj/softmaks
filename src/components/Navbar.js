import React, { useState, useEffect } from 'react'
import "./Navbar.css";

function Navbar() {
const [data, setData] = useState();

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
                <button>User Panel</button>
                <button>Logout</button>
            </div>
        </nav>
    </div>
  );
}

export default Navbar