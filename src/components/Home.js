import React, { useState, useEffect } from 'react'
import ProjectTable from "./ProjectTable"
import Navbar from "./Navbar"
import "./Home.css"

function Home(props) {

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
  }, []); //DODAĆ ODŚWIEŻANIE DANYCH PRZY ZMIANIE DANYCH UŻYTKOWANIKA

  return (
    <div className='home_bg'>
      <Navbar data={data} closehome={props.closehome}/>
      <ProjectTable email={props.email}/>
    </div>
  );
}

export default Home