import React, { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoMaior.png';

export default function EditProject() {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value] = useState('');

    const history = useHistory();

    const teamId = localStorage.getItem('teamId');
    const id = localStorage.getItem("projectID");


    useEffect(() => {
        api.get('project', {
            headers: {
                Authorization:teamId,
                id,
            }
        }).then(response => {
            setTitle(response.data[0].title);
            setDescription(response.data[0].description);
            console.log(response.data[0]);
        })
    }, []);


    async function handleEditProject(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('project/edit', data, {
                headers: {
                   Authorization:teamId,
                   id,
                }
            })
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar, tente novamente.');
        }
        
    }

    return (
        <div className="new-project-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Project Dawn" />

                    <h1>Editar novo projeto</h1>
                    <p>Edite as informações de seu projeto.</p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#00E0FF" />
                        Voltar para Profile
                    </Link>

                </section>

                <form onSubmit={handleEditProject}>
                    <input
                        placeholder="Título do projeto" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                    <textarea 
                        placeholder = "Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <button className="button" type="submit">Cadastrar</button> 
                </form>
            </div>
        </div>
    );
}