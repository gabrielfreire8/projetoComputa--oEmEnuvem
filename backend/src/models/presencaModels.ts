import { knex } from "../data/connection";

let today = new Date().toISOString().slice(0,10);
class PresencaModel{
    async cadastrar(presenca: {
        idBeneficiado: number,
        data: string,
        status: string
    }, idAtividade: number){
        try{
            let cadastro = await knex.insert({beneficiados_idUsuarios: Number(presenca.idBeneficiado),
                atividades_idatividades: Number(idAtividade),
                data: today,
                status: "Presente"
            }).table('presenca')

            if(cadastro.length > 0){
                return {status: true,
                    message: "Cadastro Realizado com sucesso"
                }
            }else{
                return {status: false,
                    message: "Não foi possivel cadastrar a presenca do usuario"
                }
            }
        }catch(error){
            return {status: false,
                error
            }
        }
    }
    async deletePresenca(idPresenca: number){
        try{
            let deletePresenca = knex.delete().where({idpresenca: idPresenca}).table("presenca");
            if(deletePresenca === 0){
                return{status: false,
                    message: "Nao foi possivel deletar essa presenca"
                }
            }
            return {status: true,
                message: "Presenca deletada com sucesso"
            };
        }catch(error){
            return { status: false,
                error
            }
        }
    };

    async getByAtividade(idAtividade: number){
        try{
            let atividades = await knex.select(["*"]).where({atividades_idatividades: idAtividade}).table('presenca');
            console.log(atividades)
            if(atividades.length < 0){
                return {status: false,
                    message: "Nao foi encontrado presencas para essa atividade"
                }
            };
            return {status: true,
                atividades
            }
        }catch(error){

            return {status: false,
                error: error
            }
        };
    };

    async updatePresenca(idPresenca: number, presenca: {
        idBeneficiado: number,
        idAtividade: number,
        data: string,
        status: string
    }){
        try{
            let update = await knex.update({
                beneficiados_idBeneficiados: presenca.idBeneficiado,
                atividades_idatividades: presenca.idAtividade,
                data: presenca.data,
                status: presenca.status
            }).where({idpresenca: idPresenca}).table('presenca');
            
            if(update === 1){
                return {status: true,
                    message: "Presenca alterado com sucesso"
                }
            }
            return {status: false,
                message: "Erro ao alterar presencas"
            }
        }catch(error){
            return {status: false,
                error
            }
        }
    };
};

export default new PresencaModel;