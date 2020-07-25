const express = require('express');
const router = express.Router();

const fs = require('fs')
const path = require('path');
const multer = require('multer');

const UploadServices = require('../../services/upload');
const uploadServices = new UploadServices();

try {
    let storage = multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, './archivos/carga')
        },
        filename:function(req, file, cb){
            cb(null, file.fieldname + '-'+ Date.now() +  path.extname(file.originalname));
        }
    });

    const upload = multer({storage});

    router.post('/', upload.array('file'), (req, res) => {
        
        //Recorremos los archivos
        let archivos = req.files;
        //console.log(archivos)
        for (let i = 0; i < archivos.length; i++) {
            let nameFile = archivos[i].filename;
            //console.log(nameFile);
            //Validamos el resultado
            if(!uploadServices.validarFile(nameFile)){
            }else{
                let datos = uploadServices.readExcel(nameFile);
                res.status(200).json({
                    data : datos
                });
            }
            fs.unlinkSync(`./archivos/carga/${nameFile}`)
        }
        //return res.send(req.file);
    });
} catch (error) {
    console.log(123);
}

module.exports = router;