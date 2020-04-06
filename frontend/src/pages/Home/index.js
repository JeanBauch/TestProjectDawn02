import React, { useState ,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [projects, setProjects] = useState([]);
    const history = useHistory();

    const teamId = localStorage.getItem('teamId');
    const teamName = localStorage.getItem('teamName');
    

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: teamId,
            }
        }).then(response => {
            setProjects(response.data);
        })
    }, [teamId]);

    async function handleDeleteProject(id) {
        try {
            await api.delete(`projects/${id}`, {
                headers: {
                    Authorization: teamId,
                }
            });

            setProjects(projects.filter(project => project.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

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
        <div className="profile-container">
            <header>
                <Link id="btnHome" to="/">
                    <img src={logoImg} alt="Project Dawn" />
                </Link>
                <span>Bem vindo, {teamName}</span>

                <Link className="button" to="/projects/new">Cadastrar novo caso</Link>
                <button onClick={handleProfile} type="button">
                    <FiUser size={18} color="#00E0FF" />
                </button>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#00E0FF" />
                </button>
            </header>

            <h1>Projetos cadastrados (Home)</h1>
        </div>
    );
}
