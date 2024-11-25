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
            let presentes = [];
            let presencas = [];
            let datas = await atividadesModel.getDatas();
            let formatar = (dateString: any) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
            
                return `${year}-${month}-${day}`;
            }

            for(let i = 0; i < datas.length; i++){
                let data = formatar(datas[i].data)
                let atividade = await presencaModels.getByAtividade(data);
                if(atividade.length > 0){presentes.push(atividade)};
            };
            console.log(presentes)
            for(let j = 0; j < presentes.length; j++){
                    let i = 0
                    let dataAtividade = formatar((presentes[j])[0].atividades_data);
                    let obj = []
                    while(i < presentes[j].length){
                        let lista = presentes[j];
                        let participante = await beneficiadoModel.getByID(lista[i].usuario_idusuario);
                        obj.push(participante[0])
                        i++;
                    }
                    presencas.push({data: dataAtividade, participantes: obj})
            };
            return res.status(200).json({presencas})

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