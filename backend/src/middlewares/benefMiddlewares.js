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

    async checkDeletedBenef(req, res, next){
        let user = await beneficiadoModel.getBeneficiadoById(req.body.id);
        if(user === 404){
            return res.status(404).json({
                message: "Usuário foi apagado/não criado"
            });
        }
        next()
    };
    
};


module.exports = new beneficiadosMidd