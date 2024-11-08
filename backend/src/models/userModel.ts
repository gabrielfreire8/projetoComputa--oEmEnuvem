import {knex} from '../data/connection';

class User{
    
    async new(nome: string, usuario: string, pass: string, funcao:string){
        try{
            let newUser = await knex.insert({
                nome: nome,
                usuario: usuario,
                senha: pass,
                funcao: funcao
            }).table('usuario')
            return newUser;
        }catch(error: any){
            if(error.code === "ER_DUP_ENTRY"){
                return 409
            }
            console.log(error)
            return 404}
    };

    async getByID(id: number){
        try{
            let user = await knex.select(['nome','usuario', 'senha', 'funcao']).where({idusuario: id}).table('usuario');
            return user[0];
        }catch(error){
            return 404;
        };
    };

    async getByUser(userPar: string){
        try{
            let user = await knex.select(['idusuario', 'nome', 'usuario', 'senha','funcao']).where({usuario: userPar}).table('usuario');
            return user.length > 0
            ? {status: true, values: user[0]}
            : {status: false, message: "Usuario não encontrado."}
        }catch(error){
            return error;
        }
    };

    

    async updateUser(id:number, nome:string, usuario:string, hash:string, funcao:string){
        try{
            let user = await knex.update({nome: nome, usuario: usuario, senha: hash, funcao: funcao}).where({idusuario: id}).table('usuario');
            console.log(user)
            return 200;
        }catch(error: any){
            console.log(error);
            return 404
        }
    };

    async deleteUser(id:number){
        try{
            let excludeUser = knex.delete().where({idusuario: id}).table("usuario");
            console.log(excludeUser)
            return excludeUser;
        }catch(error:any){
            return error
        };
    };
};

export default new User;