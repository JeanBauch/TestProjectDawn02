const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const multers3 = require("multer-s3");
const aws = require("aws-sdk");

const storageType = {
    local: multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,path.resolve(__dirname,"..","..","..","img"));
        },
        filename: (req,file,cb) => {
            crypto.randomBytes(16, (err,has) => {
                if(err) cb(err);
                file.key = `${has.toString("hex")}-${file.originalname}`;
                cb(null,file.key);
            }); 
        },
    }),
    s3: multers3({
        s3: new aws.S3(),
        bucket: "upload-image-pd",
        contentType: multers3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req,file,cb) => {
            crypto.randomBytes(16, (err,has) => {
                if(err) cb(err);
                const fileName = `${has.toString("hex")}-${file.originalname}`;
                cb(null,fileName);
            }); 
        },
    }),
}

module.exports = {
    dest: path.resolve(__dirname,"..","..","..","img"),
    storage: storageType["s3"],
    limits: {
        fileSize: 2 * 1024 * 1024, 
    },
    fileFilter: (req,file,cb) => {
        const permission = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];
        if(permission.includes(file.mimetype)) {
            cb(null,true);
        } else {
            cb(new Error("Tipo inválido") );
        }
    }
}; 