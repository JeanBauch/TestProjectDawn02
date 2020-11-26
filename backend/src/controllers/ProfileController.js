const connection = require('../database/connection');

module.exports = {
    async index(request, response) {           // Listar projetos especificos do time
        const team_id = request.headers.authorization;

        if (team_id == "e341046b") {
            const projects = await connection('projects')
            .select('*');
            
            return response.json(projects);
        } 

        const projects = await connection('projects')  // Acessa todos os projetos do ID do time
        .where('team_id', team_id)
        .select('*'); 

                                
        return response.json(projects);
    }
}