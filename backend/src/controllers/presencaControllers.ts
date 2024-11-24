import atividadesModel from "../models/atividadesModel";
import beneficiadoModel from "../models/beneficiadoModel";
import presencaModels from "../models/presencaModels";

class PresencaControllers{
    async cadastro(req: any, res: any){
        try{
            let {data, cpf} = req.body;
            let [usuario] = await beneficiadoModel.getBeneficiadoByCpf(cpf);
            if(usuario === 404){
                return res.status(404).json({error: "participante nao encontrado"})
            }
            let presenca = await presencaModels.cadastrar(data, usuario.idparticipantes);
            console.log(presenca)
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
            let datas = [];
            let presencas: any = await presencaModels.presencasAtividades();
            console.log(presencas.length);
            for(let i = 0; i < presencas.length; i++){
                let atividade = await atividadesModel.getByID
                datas.push(presencas[i].data);  
            };
            console.log(datas)
            return res.status(200).json(presencas)
        }catch(error){
            return res.status(400).json({status: false,
                error
            })}
    };

    async deletePresenca(req: any, res: any){
        try{
            let del = await presencaModels.deletePresenca(req.body.presenca);
            if(del.status === false){
                return res.status(404).json(del);
            };
            console.log(del)
            return res.status(200).json(del)
        }catch(error){return res.status(400).json({})};

    };

    async updatePresenca(req: any, res: any){
        try{
            let {data, usuario, idpresenca} = req.body
            let presenca = await presencaModels.updatePresenca(data, usuario, idpresenca);
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