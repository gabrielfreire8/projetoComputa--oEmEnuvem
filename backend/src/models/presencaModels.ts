import { knex } from "../data/connection";
import beneficiadoModel from "./beneficiadoModel";

let today = new Date().toISOString().slice(0,10);
class PresencaModel{
    async cadastrar(data: string, usuario: number){
        try{
            let cadastro = await knex.insert({
                atividades_data: data,
                usuario_idusuario: usuario
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
            let deletePresenca = await knex.delete().where({idpresenca: idPresenca}).table("presenca");
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

    async getByAtividade(data: String){
        try{
            let presentes = []
            let atividades = await knex.select(["*"]).where({atividades_data: data}).table('presenca');
            for(let i = 0; i < atividades.length; i++){
                let alunoPresente = await beneficiadoModel.getByID(atividades[i].usuario_idusuario);
                presentes.push(alunoPresente[0]);
            }
            if(atividades.length < 0){
                return {status: false,
                    message: "Nao foi encontrado presencas para essa atividade"
                }
            };
            return {status: true,
                presentes: presentes
            }
        }catch(error){

            return {status: false,
                error: error
            }
        };
    };

    async updatePresenca(data: string, usuario: number, idpresenca: number
    ){
        try{
            let update = await knex.update({atividades_data: data, usuario_idusuario: usuario
            }).where({idpresenca: idpresenca}).table('presenca');
            
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