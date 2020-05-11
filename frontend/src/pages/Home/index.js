import React, { useState ,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/Logo.png';

import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

/*const images = [
  {
    url: '/static/images/grid-list/breakfast.jpg',
    title: 'Breakfast',
    width: '40%',
  },
  {
    url: '/static/images/grid-list/burgers.jpg',
    title: 'Burgers',
    width: '30%',
  },
  {
    url: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    width: '30%',
  },
];*/
const width = '100%';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 400,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 400,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function Home() {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const history = useHistory();

    const teamId = localStorage.getItem('teamId');
    const teamName = localStorage.getItem('teamName');
    


    useEffect(() => {
        api.get('projects', {
        }).then(response => {
            setProjects(response.data);
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
    function handleProject(id)
    {
        localStorage.setItem("projectID",id)
        history.push("/project/page")
    }

    return (
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
            <div className="home-container">
              <h1></h1>

                <ul>
                    {projects.map(project => (
                        <li key={ project.id }>
                           
                            <div className={classes.root}>
                              
                            <ButtonBase
                                onClick={()=>handleProject(project.id)}
                                focusRipple
                                key={project.url}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: width,
                                }}
                                
                                >
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                    backgroundImage: `url(${project.url})`,
                                    }}
                                />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                    <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    className={classes.imageTitle}
                                    >
                                    {project.title}
                                    <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>
                                
                            </div>
                            <p></p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
