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
            return {
                status: true,
                message: "Atividade cadastrada com sucesso"};
        }catch(error){
            return {
                status: false,
                error}
        };
    }

    async getByID(idAtividade: number){
        let atividade = await knex.select(["*"]).where({idatividades: idAtividade}).table('atividades')
        if(atividade.length > 0){
            return true
        }
        return false
    };

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

    async getPendentes(){
        try{
            let atividades = await knex.select().where({aprovada: 0}).table('atividades');
            return {atividades}
        }catch(error){
            return {status: false,
                error
            }
        }
    };

    async getAprovadas(){
        try{
            let atividades = await knex.select().where({aprovada: 1}).table('atividades');
            return {atividades}
        }catch(error){
            return {status: false,
                error
            }
        }
    };

    async updateAtividade(atividadeObj:{
        id: number,
        nome: string,
        tipo: string,
        descricao: string,
        data:string}){
        try{
            let update = await knex.update({
                nome: atividadeObj.nome,
                tipo: atividadeObj.tipo,
                descricao: atividadeObj.descricao,
                aprovada: 0,
                dataRealizacao: atividadeObj.data}).where({
                idatividades: atividadeObj.id
                }).table('atividades');
                console.log(update)
            return {status: true,
                    message: "Atividade atualizada com sucesso",
                    update
            }
        }catch(error: any){
            return {status: false,
                error: error
            };
        };
    };


    async deleteAtividade(id: number){
        try{
            let atividade = await knex.delete().where({idatividades: id}).table('atividades');
            
            return {status: true,
                atividade
            }
        }catch(error: any){
            return {status: false,
                error
            }
        };
    };
};

export default new Atividades;