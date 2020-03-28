const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const team = await connection('teams')
            .where('id',id)
            .select('name')         // P retornar pro front end
            .first();
        
        if (!team) {
            return response.status(400).json( { error: 'No TEAM found with this ID' });
        }

        return response.json(team);
    }

}