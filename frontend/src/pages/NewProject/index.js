import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoMaior.png';

export default function NewProject() {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value] = useState('');

    const history = useHistory();

    const teamId = localStorage.getItem('teamId');

    async function handleNewProject(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('projects', data, {
                headers: {
                    Authorization: teamId,
                }
            }).then(response => {
                localStorage.setItem('ProjectID',response.data.id);
            })
            history.push('/projects/img');
        } catch (err) {
            alert('Erro ao cadastrar, tente novamente.');
        }
        
    }

    return (
        <div className="new-project-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Project Dawn" />

                    <h1>Cadastrar novo projeto</h1>
                    <p>Descreva seu projeto detalhadamente para compartilhar com a comunidade.</p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#00E0FF" />
                        Voltar para Profile
                    </Link>

                </section>

                <form onSubmit={handleNewProject}>
                    <input
                        placeholder="Título do projeto" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder = "Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button> 
                </form>
            </div>
        </div>
    );
}