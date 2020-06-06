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
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      
    },
    gridList: {
      
      width:'auto',
      flexWrap: 'nowrap',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

export default function ProjectPage()
{
    const [project,setProject] = useState({});
    const [images,setImages] = useState([]);
    const [vote,setVote] = useState(0);
    const id = localStorage.getItem("projectID");
    const history = useHistory();
    const [totalVote,setTotalVote] = useState(0);

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

    useEffect(()=>{
        api.get('project/vote',{
            headers:{
                id_team:teamId,
                id,
            }
        }).then(response =>{
            if(response.data.length == 0)
                setVote(0);
            else
                setVote(response.data[0].vote);

        })
    },[vote]);

    useEffect(()=>{
        api.get(`/votes/${id}`).then(response =>{
           if(response.data != null)
                setTotalVote(response.data);
   
        })
    },[vote]);


    const handlePreventDefault = e =>{
        e.preventDefault();
    }
    
    async function handleVote(id_project,value){
        console.log(vote);
        if(vote == 0)
        {
            try{
                const response = await api.post('/project/vote',{
                    data:{
                        id_team: teamId,
                        id_project,
                        vote:value,
                    }   
                })
    
            }catch(error){
                alert('Falha ao votar, tente novamente.');
            }
            console.log(vote);
        
        }
        else
        {
            try{
                const response = await api.post('/project/vote/update',{
                    data:{
                        id_team: teamId,
                        id_project,
                        vote:value,
                    }   
                })
    
            }catch(error){
                alert('Falha ao atualizar, tente novamente.');
            }
        }
          

    }

    function handleLogout() {
        localStorage.clear();
        history.push('/home');
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
                <Link id="btnHome" to="/home">
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
                        <p className="description">{project.description}</p>
                        <div className="vote">
                            <div id="votar">
                                <Box component="fieldset" mb={3} marginRight="20px" borderColor="transparent">
                                    <Typography component="legend">Votar</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={vote}
                                        onChange={(event, newValue) => {
                                        setVote(newValue);
                                        handleVote(project.id,newValue);
                                    }}
                                    />
                                </Box>
                            </div>
                            <div id="votos">
                                <Box component="fieldset" mb={3} marginLeft="20px" borderColor="transparent">
                                    <Typography component="legend">Total de votos</Typography>
                                    <Rating name="read-only" value={totalVote} readOnly />
                                </Box>
                            </div>
                        </div>    
                    </div>
                    <div className="images">
                    <div className={classes.root}>
                    <GridList className={classes.gridList} cols={images.length} >
                        {images.map((tile) => (
                        <GridListTile key={tile.key}>
                            <img id="imageList" src={tile.url} alt={tile.name}  />
                            <GridListTileBar
                            title={tile.name}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
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