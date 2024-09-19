import { knex } from "../data/connection"

class AtividadesApprove{
    async new(Atividade:{
        idAtividade: number,
        idAprovador: number}){
            try{
                let today = new Date().toISOString().slice(0,10)
                let approve = await knex.insert({atividades_idatividades: Atividade.idAtividade,
                    status: "Aprovado",
                    aprovadoPor: Atividade.idAprovador,
                    dataAprovacao: today
                }).table('aprovacaoAtividades');
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
            let aprovacao = await knex.delete().where({idaprovacaoAtividades: id}).table('aprovacaoAtividades');
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