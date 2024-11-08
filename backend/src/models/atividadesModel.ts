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
                status: 0,
                data: atividadeObj.data
            }).table('atividades');
            return {
                status: true,
                message: "Atividade cadastrada com sucesso"};
        }catch(error){
            console.log(error)
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
            let atividades = await knex.select().where({status: 0}).table('atividades');
            return {atividades}
        }catch(error){
            return {status: false,
                error
            }
        }
    };

    async getAprovadas(){
        try{
            let atividades = await knex.select().where({status: 1}).table('atividades');
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
        status: boolean,
        data:string}){
        try{
            let update = await knex.update({
                nome: atividadeObj.nome,
                tipo: atividadeObj.tipo,
                descricao: atividadeObj.descricao,
                status: atividadeObj.status,
                data: atividadeObj.data}).where({
                idatividades: atividadeObj.id
                }).table('atividades');
                console.log(update)

                if(update === 0){
                    return {status: false,
                    error: "Atividade inexistente"
                }
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