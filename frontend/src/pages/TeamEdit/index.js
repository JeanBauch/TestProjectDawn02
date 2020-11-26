import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft,FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logoMaior.png';

export default function TeamEdit() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');


    const history = useHistory();
    const teamId = localStorage.getItem('teamId');
    const teamName = localStorage.getItem('teamName');
    
    useEffect(() => {
        api.get('team', {
            headers: {
                Authorization: teamId,
            }
        }).then(response => {
            setName(response.data[0].name);
            setEmail(response.data[0].email);
            setWhatsapp(response.data[0].whatsapp);
            setCity(response.data[0].city);
            setUf(response.data[0].uf);
           console.log(response.data[0]);
        })
    }, []);

    async function handleDeleteTeam()
    {
        api.delete('/team/delete',{ 
            headers:{
                Authorization: teamId,
            }
        }).then(response =>{
            handleLogout();
        })
    }
    function handleLogout() {
        localStorage.clear();
        history.push('/home');
    }

    async function handleUpdate(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('teams/edit', data,{
                headers:{
                    Authorization: teamId,
                }
            });
            localStorage.setItem('teamName',name);
            history.push('/profile');
        } catch (err) {
            alert('Erro na alteração, tente novamente.');
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Project Dawn" />

                    <h1>Alterar</h1>
                    <p>Faça suas alterações.</p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#00E0FF" />
                        Voltar a profile
                    </Link>
                    

                </section>
                
                <form onSubmit={handleUpdate}>
                    <button className="button" onClick={handleDeleteTeam}>
                        Deletar Time
                    </button>
                    <input
                        placeholder="Nome do grupo"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email" 
                        placeholder = "E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        placeholder = "Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        required
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                        <input 
                            placeholder="UF" 
                            style={ { width:80} } 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            required
                        />
                    </div>

                    <button className="button" type="submit">Editar</button> 
                </form>
            </div>
        </div>
    );
}