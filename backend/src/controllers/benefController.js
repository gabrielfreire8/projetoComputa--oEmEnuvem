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

    async getBeneficiado(req, res){
        try{
            let user = await beneficiadoModel.getBeneficiadoById(req.params.id);
            return res.status(200).json(user[0])
        }catch(error){
            return res.status(404).json({
                message: "user not found"
            });
        };
    };

    async updateBeneficiado(req, res){
        try{
            await beneficiadoModel.updateBeneficado(req.params.id, req.body);
            let newUser = await beneficiadoModel.getBeneficiadoById(req.params.id);
            return res.status(200).json({
                message: "usuário atualizado com sucesso",
                user: newUser[0]
            });
        }catch(error){
            console.log(error);
            return res.status(422).josn({
                messsage: "conflict"
            });
        };
    };
};


module.exports = new BeneficiadoControllers;
