const beneficiadoModel = require("../models/beneficiadoModel");
const Beneficiado = require("../models/beneficiadoModel");

class BeneficiadoControllers{
    async create(req, res){
        try{
                let cad = await beneficiadoModel.new(req.body);
                if(cad === 200){
                    return res.status(200).json({
                        message: "cadastro completo com sucesso"
                    });


                }else if(cad === 422){
                    return res.status(422).json({
                        message: "Conflito de informações"
                    })
                }else{
                    return res.status(403).json({
                        message: "Bad request"
                    });
                };
        }catch(error){
            return res.status(403).json({
                message: "Bad request",
                error
            });
        };
    };
}


module.exports = new BeneficiadoControllers;
