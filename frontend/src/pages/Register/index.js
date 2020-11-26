import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logoMaior.png';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('teams', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            
            history.push('/login');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Project Dawn" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e compartilhe seu projeto.</p>
                    
                    <Link className="back-link" to="/login">
                        <FiArrowLeft size={16} color="#00E0FF" />
                        Voltar a tela de login
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
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

                    <button className="button" type="submit">Cadastrar</button> 
                </form>
            </div>
        </div>
    );
}