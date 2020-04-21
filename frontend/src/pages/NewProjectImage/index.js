import React, { /*useState*/ } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import Final from './Final'

//import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoMaior.png';


export default function NewProjectImage() {
    const history = useHistory();

    async function handleNewProject(e) {
        e.preventDefault();

        history.push('/profile');
        
    }

    return (
        <div className="new-project-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Project Dawn" />

                    <h1>Quase pronto!</h1>
                    <p>Para finalizar, insira algumas imagens do seu projeto.</p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#00E0FF" />
                        Voltar para home
                    </Link>

                </section>
                <div className="uploadImg">
                    <Final/>
                    <button className="button" type="submit" onClick={handleNewProject}>Finalizar</button>
                </div>
            </div>
        </div>
    );
}