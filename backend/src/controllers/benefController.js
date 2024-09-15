const beneficiadoModel = require("../models/beneficiadoModel");
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

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
            return res.status(422).josn({
                messsage: "conflict"
            });
        };
    };

    async deleteBeneficiado(req, res){
        try{
            let user = req.body;
            let userHash = await userModel.getByID(user.id);
            await bcrypt.compare(user.senha, userHash[0].senha, (error, result) => {
                if(error){
                    return 400
                };
                if(result === true){
                    beneficiadoModel.deleteBeneficiado(user.id);
                    return res.status(200).json({
                        message: "Dados apagados com sucesso"
                    })
                }else{
                    return res.status(400).json({
                        message: "Error! As informações do usuário não conferem"
                    });
                };
            });
        }catch(error){
            return res.status(404).json({
                message: "Usuário não pode ser excluido"
            });
        }
    }
};


module.exports = new BeneficiadoControllers;
