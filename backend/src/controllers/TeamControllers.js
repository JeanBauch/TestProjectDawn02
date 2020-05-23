const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const teams = await connection('teams').select('*');
        return response.json(teams);
    },


    async create(request, response) {
        const { name, email, whatsapp, city, uf} = request.body;
        
        const id = generateUniqueId();

        await connection('teams').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id });
    },
    async edit(request,response){
        const {name, email, whatsapp, city, uf} = request.body;
        const team_id = request.headers.authorization;

        console.log(request.body);
        console.log(team_id);
        
        await connection('teams').update({
            name,
            email,
            whatsapp,
            city,
            uf
        })
        .where('id',team_id);  
        return response.json({team_id});
    },
    async byId(request,response){
        const team_id = request.headers.authorization;

        const team = await connection('teams')
            .where('id', team_id)
            .select('*');                               // Acessa todos os projetos do ID do time
    
        return response.json(team);

    }
   
};