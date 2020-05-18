import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoMaior.png';

//import logoImg from '../../assets/logo.svg';
export default function Initial(){


    return(
        
        <div className="initial-container">
            <div className="initial-first">
                <img src={logoImg}></img>
                <label id="logo">O Alvorecer dos Projetos</label>
            </div>
            <div className="initial-second">
                <Link to="/home">
                    <button id="btnInitial" >Home</button>
                </Link>                    
                <label id="description">Project Dawn é uma iniciativa com o intuíto de divulgar informações, sendo elas, de projetos universitários, TCC, ou iniciações científicas; de forma confiável, fácil e rápida.</label>

            </div>
         
        </div>

       
    );
}
