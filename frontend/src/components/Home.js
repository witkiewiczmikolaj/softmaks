import React, { useState, useEffect } from 'react'
import ProjectTable from "./ProjectTable"
import Navbar from "./Navbar"
import "./Home.css"

function Home(props) {

  return (
    <div className='home_bg'>
      <Navbar email={props.email} closehome={props.closehome}/>
      <ProjectTable email={props.email}/>
    </div>
  );
}

export default Home