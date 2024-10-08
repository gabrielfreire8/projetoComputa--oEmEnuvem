import Beneficiado from '../models/beneficiadoModel'
const userModel = require('../models/userModel.ts');
const bcrypt = require('bcrypt');
class BeneficiadoControllers {
    async create(req: any, res:any) {
        try {
            let cad = await Beneficiado.new(req.body);
            console.log(cad)
            if (cad === 200) {
                return res.status(200).json({
                    message: "cadastro completo com sucesso"
                });
            } else if (cad === 422) {
                return res.status(422).json({
                    message: "Conflito de informações"
                });
            } else {
                return res.status(403).json({
                    message: "Bad request"
                });
            }
        }catch(error){
            return res.status(403).json({
                message: "Bad request",
                error: error});
        }
    }

    async getBeneficiado(req: any, res: any) {
        try {
            console.log("GET");
            let user = await Beneficiado.getBeneficiadoById(req.params.id);
            if(user === 404){
                return res.status(404).send({
                    message: "User not found"
                })
            }
            return res.status(200).json(user[0]);
        } catch (error) {
            return res.status(404).json({
                message: "user not found"
            });
        }
    }

    async updateBeneficiado(req: any, res: any) {
        try {
            await Beneficiado.updateBeneficado(req.params.id, req.body);
            let newUser = await Beneficiado.getBeneficiadoById(req.params.id);
            return res.status(200).json({
                message: "usuário atualizado com sucesso",
                user: newUser[0]
            });
        } catch (error) {
            return res.status(422).json({
                message: "conflict"
            });
        }
    }


    async deleteBeneficiado(req: any, res:any){
        try{
            let user = req.body;
            let userHash = await userModel.getByID(user.id);
            await bcrypt.compare(user.senha, userHash[0].senha, (error:any, result: boolean) => {
                if(error){
                    return 400
                };
                if(result === true){
                    Beneficiado.deleteBeneficiado(user.id);
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


export default new BeneficiadoControllers;
