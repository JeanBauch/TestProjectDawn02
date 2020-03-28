const express = require('express'); // Importa o express

const TeamController = require('./controllers/TeamControllers');
const ProjectController = require('./controllers/ProjectControllers');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();    // Desacoplando as rotas do express, em uma nova variavel

routes.post('/sessions', SessionController.create);

routes.get('/teams', TeamController.index);
routes.post('/teams', TeamController.create);

routes.get('/profile', ProfileController.index);

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.create);
routes.delete('/projects/:id', ProjectController.delete);

module.exports = routes;