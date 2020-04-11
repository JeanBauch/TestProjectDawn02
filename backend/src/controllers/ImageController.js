const connection = require('../database/connection');
const aws = require("aws-sdk");
const s3 = new aws.S3();

module.exports = {
    async index(request, response) {
        const img = await connection('images').select('*');
        return response.json(img);
    },


    async create(request, response) {
        const { key, name, size, url} = request.body;
    

        await connection('images').insert({
            key,
            name,
            size,
            url,
        })
    
        return response.json();
    },

    async createImg(req,res) {
        const { key, originalname: name,size, location: url="" } = req.file;
        
        const jooj = await connection('images').insert({
            key,
            name,
            size,
            url,
        })
        return res.json();
    },

    async delete(req,res) {
        const { id } = req.params; 
        const img = await connection('images').where('key',id).delete();
        
        s3.deleteObject({
            Bucket: "upload-image-pd",
            Key: id,
        }).promise();

        return res.json();
    }
};