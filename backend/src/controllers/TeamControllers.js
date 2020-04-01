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
    }
};