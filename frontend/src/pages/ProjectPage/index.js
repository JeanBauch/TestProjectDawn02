import React, { useState ,useEffect } from 'react';
import api from '../../services/api';

export default function ProjectPage()
{
    const [project,setProject] = useState();
    const id = localStorage.getItem("projectID");
    
    useEffect(() => {
        api.get('project', {
            headers: {
                id: id,
            }
        }).then(response => {
            setProject(response.data);
            console.log(project);
        })
    }, []);

    return(
        <div>
            <h1>Pagina Projeto</h1>       
        </div>

    )
}