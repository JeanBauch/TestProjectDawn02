import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import Swal from 'sweetalert2'


import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoMaior.png';
//import logoImg from '../../assets/logo.svg';
import filesImg from '../../assets/TransferFiles.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            localStorage.setItem('teamId',id);
            localStorage.setItem('teamName',response.data.name);

            if (id == "e341046b") {
                const { value: password } = await Swal.fire({
                    title: 'Enter your password',
                    input: 'password',
                    inputLabel: 'Password',
                    inputPlaceholder: 'Enter your password',
                    inputAttributes: {
                      maxlength: 10,
                      autocapitalize: 'off',
                      autocorrect: 'off'
                    }
                  })
                  
                  console.log(password);
                  if (password == "123") {
                    Swal.fire(`Senha correta!`)
                    history.push('/profile');
                  }
                  else {
                    Swal.fire(`Senha incorreta!`)
                  }
            }
            else {
                history.push('/profile');
            }

            

        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <Link id="btnHome" to="/home">
                    <img src={logoImg} alt="Project Dawn" />
                </Link>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#00E0FF" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={filesImg} alt="Files" />
        </div>
    );
}