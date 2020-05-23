const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
                // rota = /projects?page=1
        
        const [count] = await connection('projects').count();      //Irá retornar: 'count(*): numero total de projetos'

        const projects = await connection('projects')
            .join('teams','teams.id','=','projects.team_id')               // Puxar dados da table dos times 
            // .limit(5)
            // .offset((page-1) * 5)   // Listar os projetos 5 por vez, uma paginaçao
            .select(['projects.*',
                'teams.name',
                'teams.email',
                'teams.whatsapp',
                'teams.city',
                'teams.uf'
            ]);  // Filtra os dados que quer da tabla do team

        response.header('X-Total-Count', count['count(*)']);  // O numero total de projetos é passada no Headers e não no body

        return response.json(projects)
    },

    async create(request, response) {
        const { title, description } = request.body;
        const team_id = request.headers.authorization;

        const dNow = new Date;
        const data =  dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
 
       
        const [id] = await connection('projects').insert({
            title,
            description,
            data,
            team_id,
            url: "",
        });
        
        response.header('ProjectID', id);
        return response.json({ id });
    },

    
    async insertURL(request, response) {
        const urlimg = request.headers.urlimg;
        const id = request.params.id;
        
        await connection('projects').where('id',id).update({
            url: urlimg,
        });
        return response.json({ urlimg });
    },


    async delete(request, response) {
        const { id }  = request.params;
        const team_id = request.headers.authorization;  // Isso para verificar se é o msm time
        
        const project = await connection('projects')
            .where('id', id)
            .select('team_id')
            .first();

        if(project.team_id !== team_id) {
            return response.status(401).json({ error: 'Operation not permitted' });  // Cod 401 é n autorizado!
        }

        await connection('projects').where('id', id).delete();

        return response.status(204).send(); // cod 204 é No content (resposta com sucesso sem conteudo)
    },
    async page(request,response)
    {
        const id = request.headers.id;
        
        const project = await connection('projects')
            .where('id',id)
            .select('*')
        
        return response.json(project);
    },

    async vote(request,response){
        const {id_team,id_project,vote} = request.body.data;
        
        await connection('vote').insert({
            id_team,
            id_project,
            vote,
        })
        return response.json({id_team,id_project,vote});
    },
    async updateVote(request,response){
        const {id_team,id_project,vote} = request.body.data;
        const update = await connection('vote').update({
            vote,
        })
        .where('id_project',id_project)
        .where('id_team',id_team)
        console.log(update);


        return response.json(update);
    },

    async viewVotes(request,response){
       
        const {id_team,id} = request.headers;

      
        const vote = await connection('vote')
            .where('id_project',id)
            .where('id_team',id_team)
            .select('vote')


        return response.json(vote);
    },

    async edit(request, response) {
        const { title, description } = request.body;
        const id = request.headers.id;
        const team_id = request.headers.authorization;
        const project = await connection('projects').update({
            title,
            description,
        
        })
        .where('id',id)
        .where('team_id',team_id);
       
        return response.json(project);
    },
    
    
};