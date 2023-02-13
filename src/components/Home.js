import React from 'react'
import ProjectTable from "./ProjectTable"
import Navbar from "./Navbar"

function Home(props) {
  return (
    <div>
      <Navbar data={props.data}/>
      <ProjectTable />
    </div>
  );
}

export default Home