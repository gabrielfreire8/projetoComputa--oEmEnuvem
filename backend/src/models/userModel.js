const knex = require('../data/connection');

class User{
    async new(nome, usuario, pass ,funcao){
        try{
            let newUser = await knex.insert({
                nome: nome,
                usuario: usuario,
                senha: pass,
                funcao: funcao
            }).table('usuarios')
            
            
            return newUser


        }catch(error){
            if(error.code === "ER_DUP_ENTRY"){
                return 409
            }
            console.log(error)
            return 404}
    }

    async getByID(id){
        try{
            let user = await knex.select(['nome','usuario', 'senha', 'funcao']).where({idusuarios: id}).table('usuarios');
            return user;
        }catch(error){
            console.log(error);
            return 404;
        };
    };

    async updateUser(user){
        try{
            await knex.update({nome: user.nome, usuario: user.usuario, senha: user.senha}).where({idusuarios: user.id}).table('usuarios');
            return 200;
        }catch(error){
            console.log(error);
            return 404
        }
    }

    async deleteUser(id){
        try{
            let excludeUser = knex.delete().where({idusuarios: id}).table("usuarios");
            return excludeUser;
        }catch(error){
            return error
        };
    };
};

module.exports = new User