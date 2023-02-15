import React, { useState, useEffect }  from "react";
import "./ProjectTable.css";
import ModalCreateFirst from "./modals/ModalCreateFirst"

const ProjectTable = (props) => {

    const [projects, setProjects] = useState();
    const [opencreate, setOpencreate] = useState(false);
    

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/api/get_projects');
            const projects = await response.json();
            setProjects(projects);
        }
        fetchData();
      }, []);

    return (
        <div className="table_container">
            <button className="create_button" onClick={() => {setOpencreate(true);}}>Stwórz nowy projekt</button>
            <table>
                <thead>
                    <tr>
                    <th>Nazwa projektu</th>
                    <th>Data rozpoczęcia projektu</th>
                    <th>Data zakończenia projektu</th>
                    <th>Status</th>
                    <th>Operacje</th>
                    </tr>
                </thead>
                <tbody>
                    {projects ? projects.map((project, index) => (
                    <tr key={index}>
                        <td>{project.name}</td>
                        <td>{project.start}</td>
                        <td>{project.end}</td>
                        <td>{project.status}</td>
                        <td>
                        <button>Edycja</button>
                        <button>Dodaj komentarz</button>
                        <button>Szczegóły projektu</button>
                        <button>Usuń</button>
                        </td>
                    </tr>
                    )) : <tr><td></td></tr>}
                </tbody>
            </table>
            {opencreate && <ModalCreateFirst closemodal={setOpencreate} data={props.data} />}
        </div>
    );
};

export default ProjectTable;
