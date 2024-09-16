const knex = require('../data/connection');

class Atividades{
    async new(ativiadeObj:any){
        try{
            let cadastroAtividade = await knex.insert({nome: ativiadeObj.nome,
                tipo: ativiadeObj.tipo,
                descricao: ativiadeObj.descricao,
                aprovada: 0
            }).table('atividades');
            return cadastroAtividade;
        }catch(error){
            return error
        };
    }
};

module.exports = new Atividades;