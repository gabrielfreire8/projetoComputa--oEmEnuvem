import { knex } from "../data/connection"

class AtividadesApprove{
    async new(Atividade:{
        idAtividade: number}){
            try{
                let approve = await knex.insert({atividades_idatividades: Atividade.idAtividade,
                    status: 1
                }).table('aprovacaoatividades');
                return {status: true,
                        message: "Aprovacao inserida com sucesso",
                        approve
                }
            }catch(error){
                return {status: false,
                    error
                }
            }
        }
    async delete(id: number){
        try{
            let aprovacao = await knex.delete().where({atividades_idatividades: id}).table('aprovacaoatividades');
            if(aprovacao === 1){ return {
                status: true,
                message: "Apagado com sucesso"
            }};
            return {
                status: false,
                message: "Erro ao apagar atividade"        
            }
        }catch(error){
            return {status: false,
                error
            }
        }
    };

    async getAll(){
        try{
            let aprovacoes = await knex.select(["*"]).table('aprovacaoatividades');
            if(aprovacoes.length > 0){
                return {status: true,
                    aprovacoes
                }
            }return {status: false,
                message: "nao econtrado aprovacoes"
            }
        }catch(error) {return { status: false, error}}
    };
};

export default new AtividadesApprove