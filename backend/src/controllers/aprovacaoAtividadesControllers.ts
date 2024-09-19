import AtividadesApprove from "../models/aprovacaoAtividades";

class AprAtividadeControllers{
    async new(req: any, res: any){
        try{
            let atividadeObj: {idAtividade: number,
                idAprovador: number
            } = req.body;
            let atividade = await AtividadesApprove.new(atividadeObj);
            return res.status(200).json({atividade})
        }catch(error){
            return res.status(403).json({
                message: "Error",
                error
            });
        }
    };

    async delete(req: any, res: any){
        try{
            let atividade = await AtividadesApprove.delete(req.body.id);
            if(atividade.status === true){
                return res.status(200).json({
                    message: "Aprovacao apagada com sucesso",
            })
            };
            return res.status(400).json({
                message: "Erro ao apagar atividade",
            })
        }catch(error){
            return res.status(400).json({
                message: "erro ao apagar aprovacao",
                error
            })
        }
    }

    async getAll(req: any, res: any){
        try{
            let atividades = await AtividadesApprove.getAll();
            if(atividades.status === true){
                return res.status(200).json(atividades);
            }return res.status(404).json({atividades})
        }catch(error){
            return res.status(400).json({
                message: "Erro ao buscar aprovacoes",
                error
            })
        }
    }
};


export default new AprAtividadeControllers;

