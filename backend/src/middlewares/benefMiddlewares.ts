import beneficiadoModel from "../models/beneficiadoModel";

class beneficiadosMidd{
    async checkCpf(req: any, res:any , next:any){
        let cad = await beneficiadoModel.getCpf(req.body.cpf);
            if(cad === 404){
                next();
            }else{
                return res.status(422).json({
                    message: "Conflito de dados"
                });
            };
    };

    async checkDeletedBenef(req:any, res:any, next:any){
        let user = await beneficiadoModel.getBeneficiadoById(req.body.id);
        if(user === 404){
            return res.status(404).json({
                message: "Usuário foi apagado/não criado"
            });
        }
        next()
    };
    
};


export default new beneficiadosMidd