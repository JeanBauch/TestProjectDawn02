import React, { useState ,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2,FiSettings }  from'react-icons/fi';
import { FiUser } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/Logo.png';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: 'black',
  },
 
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#00e0ff',
  },
  
  
}));

export default function Profile() {
    const [projects, setProjects] = useState([]);
    /*const [images, setImages] = useState([]);*/
    const history = useHistory();
    const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

    /*useEffect(() => {
        async function fetchData(){
            await api.get('/projects/img').then(response => {
                setImages(response.data);
            })
        }
        fetchData();
    },[]);

    function handleImages(id) {
        const imagesProject = images.map(img => {
            return img.project === id ? { ...img, sin: true } : null
        });
        
        setImages(imagesProject);
    }*/
    /*
    async function handleDeleteTeam()
    {
        api.delete('/team/delete',{ 
            headers:{
                Authorization: teamId,
            }
        }).then(response =>{
            handleLogout();
        })
    }*/


    async function handleDeleteProject(id) {
        try {
            await api.delete(`projects/${id}`, {
                headers: {
                    Authorization: teamId,
                }
            });

            setProjects(projects.filter(project => project.id !== id));
        } catch (err) {
            //alert('Erro ao deletar caso, tente novamente.');
        }
    }
    function handleEditProject(projectid){
        localStorage.setItem("projectID",projectid);
        history.push("/project/edit");
    }
    function HandleEditTeam(){
        history.push('/team/edit');
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/home');
    }

    function handleProfile() {
        history.push('/profile');
    }

    return (
        <div>
            <div className="header-container">
            <header>
                <Link id="btnHome" to="/home">
                    <img src={logoImg} alt="Project Dawn" />
                </Link>
                <span>Bem vindo, {teamName}</span>
                
                <Link className="buttonHmCadastro" to="/projects/new">Cadastrar novo caso</Link>

                <button onClick={HandleEditTeam} type="button">
                    <FiSettings size={20} color="#00E0FF" />
                </button>

                <button onClick={handleProfile} type="button">
                    <FiUser size={20} color="#00E0FF" />
                </button>
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={20} color="#00E0FF" />
                </button>
            </header>
        </div>

        <div className="profile-container">
           
            <h1>Projetos cadastrados</h1>
            <ul>
                {projects.map(project => (
                    <li key={ project.id }>
                       <strong>Projeto: </strong>
                        <p>{project.title}</p>

                        <strong>Descrição:</strong>
                        <p>{project.description}</p>

                        <strong>Logo:</strong>
                        <img src={project.url} alt="Logo do Projeto"></img>

                        <button onClick={() => handleDeleteProject(project.id)} type="button">
                            <FiTrash2 size={20} color="#ffffff" />
                        </button>
                        <button id="settings" onClick={() => handleEditProject(project.id)} tupe="button">
                            <FiSettings size={20} color="#ffffff" />
                        </button>
                      {/*
                    <Card  className={classes.root}>
                        <CardHeader  style={{color:'white'}}
                            avatar={
                            <Avatar  className={classes.avatar}>
                                PD
                            </Avatar>
                            }
                            action={
                            <IconButton  style={{color:'white'}} aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={project.title}
                            
                            subheader = {project.data} 
                        />
                        <CardMedia
                            className={classes.media}
                            image={project.url}
                            
                        />
                        <CardContent>
                            <Typography  variant="body2" style={{color:'white'}} color="textSecondary" component="p">
                                {project.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                           
                            <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon style={{color:'white'}} />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography paragraph style={{color:'white'}}>Descrição:</Typography>
                            <Typography paragraph style={{color:'white'}}>
                                {project.description}
                            </Typography>
                            </CardContent>
                    </Collapse>
                        </Card> */}
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

