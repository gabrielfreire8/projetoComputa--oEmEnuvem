import beneficiadoModel from '../models/beneficiadoModel';
import Beneficiado from '../models/beneficiadoModel'
const userModel = require('../models/userModel.ts');
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

    async getBeneficiados(req: any, res: any){
        try{
            let participantes = await beneficiadoModel.getBeneficados();
            if(participantes === 404){
                return res.status(404).json({error: "nao foram encontrados participantes"})
            }return res.status(200).json(participantes)
        }catch(error){
            return res.status(400).json(error)
        }
    };

    async getBeneficiado(req: any, res: any) {
        try {
            let user = await Beneficiado.getBeneficiadoByCpf(req.params.cpf);
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
            await Beneficiado.updateBeneficado(req.body);
            let newUser = await Beneficiado.getBeneficiadoByCpf(req.body.cpf);
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
            let [user] = await beneficiadoModel.getBeneficiadoByCpf(req.params.cpf);
            let deleted = await Beneficiado.deleteBeneficiado(user.idparticipantes);
            if(deleted === 1){
                return res.status(200).json({
                    message: "Dados apagados com sucesso"
                    });
            }else{
                return res.status(400).json({
                    message: "Beneficiado não pode ser apagado",
                    status: deleted
                })
            }
            
        }catch(error){
            return res.status(404).json({
                message: "Usuário não pode ser excluido"
            });
        }
    }
};


export default new BeneficiadoControllers;
