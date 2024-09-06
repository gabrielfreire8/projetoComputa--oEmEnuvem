const beneficiadoModel = require("../models/beneficiadoModel");

class beneficiadosMidd{
    async checkCpf(req, res, next){
        let cad = await beneficiadoModel.getCpf(req.body.cpf);
            console.log(cad)
            if(cad === 404){
                next();
            }else{
                return res.status(422).json({
                    message: "Conflito de dados"
                });
            };
    };
    
};


module.exports = new beneficiadosMidd