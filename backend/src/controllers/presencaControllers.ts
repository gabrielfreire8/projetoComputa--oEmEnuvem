import presencaModels from "../models/presencaModels";

class PresencaControllers{
    async cadastro(req: any, res: any){
        try{
            let idAtividade: number = req.params.idAtividade
            let info = req.body;
            let presenca = await presencaModels.cadastrar(info, idAtividade);
            if(presenca.status === false){
                return res.status(400).json(presenca)
            }
            return res.status(200).json(presenca);
        }catch(error){
            return res.status(400).json({
                status: false,
                message: "Erro ao cadastrar usuário",
                error
            })
        };
    };

    async getPresencaByAtividade(req: any, res: any){
        try{
            let id = req.params.idAtividade;
            let presencas = await presencaModels.getByAtividade(id);
            
            return res.status(200).json(presencas)
        }catch(error){
            console.log("AQ")
            return res.status(400).json({status: false,
                error
            })}
    };

    async deletePresenca(req: any, res: any){
        try{
            let del = await presencaModels.deletePresenca(req.params.idAtividade);
            if(del.status === false){
                return res.status(404).json(del);
            };
            return res.status(200).json(del)
        }catch(error){return res.status(400).json({})};

    };

    async updatePresenca(req: any, res: any){
        try{
            let idPresenca = req.params.idPresenca;
            let presenca = await presencaModels.updatePresenca(idPresenca, req.body);
        if(presenca.status === false){
            return res.status(400).json(presenca)
        }
        return res.status(200).json(presenca);
    }catch(error){
            return res.status(400).json({
                status: false,
                error
            })
        };  
    }
};

export default new PresencaControllers