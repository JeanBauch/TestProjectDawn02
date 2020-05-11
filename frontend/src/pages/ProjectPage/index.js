import React, { useState ,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/Logo.png';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 'auto',
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

export default function ProjectPage()
{
    const [project,setProject] = useState({});
    const [images,setImages] = useState([]);
    const id = localStorage.getItem("projectID");
    const history = useHistory();

    const teamId = localStorage.getItem('teamId');
    const teamName = localStorage.getItem('teamName');

    const classes = useStyles();


    useEffect(() => {
        api.get('project', {
            headers: {
                id: id,
            }
        }).then(response => {
            setProject(response.data[0]);
         })
    }, []);
    useEffect(() => {
        api.get('images', {
            headers: {
                id: id,
            }
        }).then(response => {
            setImages(response.data);
          
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

    return(
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
      
        
            <div className="project-container">
                
                <div className="infos">
                    <div className="principal">
                        <p id="title">{project.title}</p>
                        <img id="imageLogo" src={project.url} alt="Logo do Projeto"></img>
                        <p id="description">{project.description}</p>
                    </div>
                    <div className="images">
                   <div className={classes.root}>
                        <GridList cellHeight={180} className={classes.gridList}>
                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            </GridListTile>
                            {images.map((tile) => (
                            <GridListTile key={tile.key}>
                                <img src={tile.url} alt={tile.name} />
                                <GridListTileBar
                                title={tile.name}
                                actionIcon={
                                    <IconButton aria-label={`info about ${tile.url}`} href={tile.url} className={classes.icon}>
                                    <InfoIcon />
                                    </IconButton>
                                }
                                />
                            </GridListTile>
                            ))}
                        </GridList>
                        </div>
                    </div>
    
                </div>
                
               
            </div>
        </div>
    )
}