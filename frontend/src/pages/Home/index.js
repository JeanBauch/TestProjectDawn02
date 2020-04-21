import React, { useState ,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/Logo.png';

export default function Profile() {
    const [projects, setProjects] = useState([]);
    const history = useHistory();

    const teamId = localStorage.getItem('teamId');
    const teamName = localStorage.getItem('teamName');
    

    useEffect(() => {
        api.get('projects', {
        }).then(response => {
            setProjects(response.data);
        })
    }, []);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function handleProfile() {
        if(teamId==null)
            history.push('/login');
        else
            history.push('/profile');
    }

    return (
        <div>
            <div className="header-container">
                <header>
                    <Link id="btnHome" to="/">
                        <img src={logoImg} alt="Project Dawn" />
                    </Link>
                    <span>Bem vindo, {teamName}</span>

                    <Link className="buttonHmCadastro" to="/projects/new">Cadastrar novo caso</Link>
                    <button onClick={handleProfile} type="button">
                        <FiUser size={20} color="#00E0FF" />
                    </button>

                    <button onClick={handleLogout} type="button">
                        <FiPower size={20} color="#00E0FF" />
                    </button>
                </header>
            </div>
            <div className="profile-container">
                <h1>Projetos cadastrados (Home)</h1>

                <ul>
                    {projects.map(project => (
                        <li key={ project.id }>
                            <strong>Projeto: </strong>
                            <p>{project.title}</p>

                            <strong>Descrição:</strong>
                            <p>{project.description}</p>

                            <strong>Imagem:</strong>
                            <p></p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
