const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const votes = await connection('vote').select('*');
        return response.json(votes);
    },
    async averageVote(request,response){
        const {id} = request.headers;

        const vote = await connection('vote')
            .where('id_project',id)
            .avg('vote')
            .whereNot('vote',0)

        console.log(vote);
        return response.json(vote);
    },

    async deleteAll(request,response)
    {
        await connection('vote').delete();
    }

};