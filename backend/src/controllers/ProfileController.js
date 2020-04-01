const connection = require('../database/connection');

module.exports = {
    async index(request, response) {           // Listar projetos especificos do time
        const team_id = request.headers.authorization;

        const projects = await connection('projects')
            .where('team_id', team_id)
            .select('*');                               // Acessa todos os projetos do ID do time
    
        return response.json(projects);
    }
}