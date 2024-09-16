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

    async getPendentes(req: any, res: any){
        try{
            let atividades = await atividadesModel.getPendentes();
        if(atividades.status === false){
            return res.status(404).json({
                message: "Erro ao localizar atividades",
                atividades
            })
        }
        return res.status(200).json(atividades);


        }catch(error){
            return res.status(403).json({
                message: "Bad request"
            })
        }
    };

    async getAprovadas(req: any, res: any){
        try{
            let atividades = await atividadesModel.getAprovadas();
        if(atividades.status === false){
            return res.status(404).json({
                message: "Erro ao localizar atividades",
                atividades
            })
        }
        return res.status(200).json(atividades);


        }catch(error){
            return res.status(403).json({
                message: "Bad request"
            })
        }
    };


    async updateAtividade(req: any, res: any){
        try{
            let atividadeObj:{
                id: number,
                nome: string,
                tipo: string
                descricao: string,
                data: string
            } = {
                id: req.params.id,
                nome: req.body.nome,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                data: req.body.data
            }
            let atividade = await atividadesModel.updateAtividade(atividadeObj)
            if(atividade.status === false){
                return res.status(400).json({atividade})
            }
            return res.status(200).json({atividade})

        }catch(error: any){
            return res.status(400).json({
            status: false,
            error})}
    };


    async deleteAtividade(req: any, res: any){
        try{
            let id: number = req.params.id
            let atividade = await atividadesModel.deleteAtividade(id)
            if(atividade.status === false){
                return res.status(409).json(atividade)
            }
            return res.status(200).json(atividade);
        }catch(error: any){
            return res.status(409).json(error)
        }
    };
}

export default new AtividadesController;