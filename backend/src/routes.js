const express = require('express'); // Importa o express
const { celebrate, Segments, Joi } = require('celebrate'); 

const TeamController = require('./controllers/TeamControllers');
const ProjectController = require('./controllers/ProjectControllers');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const ImageController = require('./controllers/ImageController');
const VotesController = require('./controllers/VotesController');
const multer  = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();    // Desacoplando as rotas do express, em uma nova variavel

routes.post('/sessions', SessionController.create);

routes.get('/teams', TeamController.index);

routes.post('/teams', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) , TeamController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileController.index);

routes.get('/projects', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number(),
    })
}),ProjectController.index);

routes.get('/projects/order',ProjectController.orderBy);
// Fazer do novo projeto...
routes.post('/projects', ProjectController.create);
routes.get('/project/filter', ProjectController.filter);

routes.delete('/projects/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ProjectController.delete);

routes.post("/projects/img",multer(multerConfig).single("file"), ImageController.createImg);


routes.get('/projects/img', ImageController.index);

routes.delete('/projects/img/:id', ImageController.delete);

routes.post('/projects/:id', ProjectController.insertURL);
routes.get('/project',ProjectController.page);
routes.get('/images',ImageController.imageProject);
routes.get('/allimages',ImageController.index);


routes.post('/project/vote',ProjectController.vote);
routes.post('/project/vote/update',ProjectController.updateVote);


routes.get('/project/vote',ProjectController.viewVotes);
routes.get('/votes',VotesController.index);
routes.get('/votes/:id',VotesController.count);
routes.delete('/votes/deleteall',VotesController.deleteAll);

routes.get('/project/averagevotes',VotesController.averageVote);

routes.post('/teams/edit',TeamController.edit);
routes.post('/project/edit',ProjectController.edit)

routes.get('/team',TeamController.byId);
routes.delete('/team/delete',TeamController.delete);
module.exports = routes;