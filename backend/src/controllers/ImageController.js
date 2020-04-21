const connection = require('../database/connection');
const aws = require("aws-sdk");
const s3 = new aws.S3();

module.exports = {
    async index(request, response) {
        const img = await connection('images').select('*');
        return response.json(img);
    },

    /*async searchById(request,response) {
        const projectid = request.headers.projectid;
        const img = await connection('images').where('project',projectid).select('url').first();

        return response.json(img);
    },*/

    async createImg(req,res) {
        const { key, originalname: name,size, location: url="" } = req.file;
        const project = req.headers.projectid;

        await connection('images').insert({
            key,
            name,
            size,
            url,
            project,
        })

        return res.json( {key,name,size,url,project} );
    },

    /*async setLogo(req,res) {
        console.log("entry");
        const project = req.headers.projectid;
        const logo = await connection('images').where('project',project).select('url').first();

        await connection('projects').where('id',project).update({
            url: logo,
        })
        return res.json(logo);
    },*/

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