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

    },
    async delete(request, response) {
        const id = request.headers.authorization;  // Isso para verificar se é o msm time
     
        const project = await connection('projects')
            .where('team_id', id)
            .select('id')
     

        project.forEach(async projectid => {
            const images = await connection('images').where('project',projectid).select('key');
      
            images.forEach(id=>{
                s3.deleteObject({
                    Bucket: "upload-image-pd",
                    Key: id.key,
                }).promise();
            });
            await connection('images').where('project',projectid).delete();
        })
        await connection('projects').where('team_id',id).delete();
        await connection('teams').where('id', id).delete();

        return response.status(204).send(); // cod 204 é No content (resposta com sucesso sem conteudo)
    },
   
};