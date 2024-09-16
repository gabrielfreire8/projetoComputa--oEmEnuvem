import { knex } from "../data/connection";

class Atividades{
    async new(atividadeObj:{
    nome: string,
    tipo: string,
    descricao: string,
    data:string}){
        try{
            await knex.insert({nome: atividadeObj.nome,
                tipo: atividadeObj.tipo,
                descricao: atividadeObj.descricao,
                aprovada: 0,
                dataRealizacao: atividadeObj.data
            }).table('atividades');
            return {status: true,
                    message: "Atividade cadastrada com sucesso"};
        }catch(error){
            return {
                status: false,
                error}
        };
    }

    async getAtividades(){
        try{
            let atividades = await knex.select(['*']).table('atividades');
            return {
                status: true,
                atividades
            }
        }catch(error){
            return {status: false,
                error
            }
        }
    };
};

export default new Atividades;