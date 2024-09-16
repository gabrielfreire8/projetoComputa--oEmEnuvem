import { error } from "console";
import atividadesModel from "../models/atividadesModel";

class AtividadesController{
    async new(req: any, res: any){
        try{
            let criarAtividade = await atividadesModel.new(req.body)
            if(criarAtividade.status === false){
                return res.status(400).json({
                    message: "Dados não conferem"});
            };
            return res.status(200).json({
                atividade: criarAtividade
            })
        }catch(error){
            console.log(error)
            return res.status(409).json({
                error: error
            })
        }
    };

    async getAll(req: any, res: any){
        try{
            let atividades = await atividadesModel.getAtividades();
            if(atividades.status === false){
                return res.status(409).json({
                    message: "Erro ao requisitar as atividades"
                });
            }
            else{
                return res.status(200).json(atividades);
            }
        }catch(error){
            return res.status(400).json({
                message: "Erro ao consultar atividades"
            })
        }
    };
}

export default new AtividadesController;