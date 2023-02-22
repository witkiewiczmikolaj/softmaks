import React, { useState, useEffect }  from "react";
import "./ProjectTable.css";
import ModalCreateFirst from "./modals/ModalCreateFirst"
import ModalDeleteFirst from "./modals/ModalDeleteFirst"
import ModalEditProjFirst from "./modals/ModalEditProjFirst"
import ModalCommentFirst from "./modals/ModalCommentFirst"
import ModalDetails from "./modals/ModalDetails"

const ProjectTable = (props) => {

    const [projects, setProjects] = useState([[[]]]);
    const [opencreate, setOpencreate] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [openeditproj, setOpeneditproj] = useState(false);
    const [opencomment, setOpencomment] = useState(false);
    const [opendetails, setOpendetails] = useState(false);
    const [projectid, setProjectid] = useState('');
    
    useEffect(() => {
        async function fetchData() {
            const response_data = await fetch('/api/get_projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email: props.email}),
            });
            const projects_response = await response_data.json();
            setProjects(projects_response);
        }
        fetchData();
      }, [opencreate, opendelete, openeditproj]);

    return (
        <div>
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
                            <td>{project[0][1]}</td>
                            <td>{project[0][3]}</td>
                            <td>{project[0][4]}</td>
                            <td>{project[0][5]}</td>
                            <td>
                            <button onClick={() => {setOpeneditproj(true); setProjectid(project[0][0])}}>Edycja</button>
                            <button onClick={() => {setOpencomment(true); setProjectid(project[0][0])}}>Dodaj komentarz</button>
                            <button onClick={() => {setOpendetails(true); setProjectid(project[0][0])}}>Szczegóły projektu</button>
                            <button onClick={() => {setOpendelete(true); setProjectid(project[0][0])}}>Usuń</button>
                            </td>
                        </tr>
                        )) : <tr><td></td></tr>}
                    </tbody>
                </table>
            </div>
            {opencreate && <ModalCreateFirst closemodal={setOpencreate} email={props.email} />}
            {opendelete && <ModalDeleteFirst closemodal={setOpendelete} id={projectid} />}
            {openeditproj && <ModalEditProjFirst closemodal={setOpeneditproj} id={projectid} email={props.email}/>}
            {opencomment && <ModalCommentFirst closemodal={setOpencomment} opendetail={setOpendetails} id={projectid} email={props.email}/>}
            {opendetails && <ModalDetails closemodal={setOpendetails} id={projectid} email={props.email}/>}
        </div>
        
    );
};

export default ProjectTable;
