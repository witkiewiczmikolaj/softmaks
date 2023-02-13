import React, { useState, useEffect }  from "react";
import "./ProjectTable.css";
import "./modals/ModalEditFirst";
import ModalEditFirst from "./modals/ModalEditFirst";

const ProjectTable = () => {

    const [projects, setProjects] = useState();
    const [openmodal, setOpenmodal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5000/api/get_projects');
            const projects = await response.json();
            setProjects(projects);
        }
        fetchData();
      }, []);

    return (
        <div>
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
                        <button
                            className="open_modal_button"
                            onClick={() => {
                                setOpenmodal(true);
                            }}
                        >
                        Edycja
                        </button>
                        {openmodal && <ModalEditFirst closeModal={setOpenmodal} />}
                        <button>Dodaj komentarz</button>
                        <button>Szczegóły projektu</button>
                        <button>Usuń</button>
                        </td>
                    </tr>
                    )) : <tr><td></td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
