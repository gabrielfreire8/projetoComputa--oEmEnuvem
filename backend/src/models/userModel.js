const knex = require('../data/connection');

class User{
    async new(nome, usuario, pass ,funcao){
        try{
            await knex.insert({
                nome: nome,
                usuario: usuario,
                senha: pass,
                funcao: funcao
            }).table('usuarios')
            
            return 200


        }catch(error){
            if(error.code === "ER_DUP_ENTRY"){
                return 409
            }
            console.log(error) 
            return 404}
        
    }

    async getByID(id){
        try{
            let user = await knex.select(['nome','usuario', 'funcao']).where({idusuarios: id}).table('usuarios');
            return user;
        }catch(error){
            console.log(error);
            return 404;
        };
    };

};

module.exports = new User