const knex = require('../data/connection');

class Beneficiados{
    async new(beneficiado){
        try{
            let cad = await this.getCpf(beneficiado.cpf);
            console.log(cad)
            if(cad === 404){
                await knex.insert({
                    cpf: beneficiado.cpf,
                    dataNascimento: beneficiado.dataNascimento,
                    genero: beneficiado.genero,
                    cidade: beneficiado.cidade,
                    logradouro: beneficiado.logradouro,
                    bairro: beneficiado.bairro,
                    cep: beneficiado.cep,
                    telefone: beneficiado.telefone,
                    email: beneficiado.email,
                    condicoesMed: beneficiado.condicoesMed,
                    alergias: beneficiado.alergias,
                    restricoes: beneficiado.restricoes,
                    necEspeciais: beneficiado.necEspeciais,
                    responsavelNome: beneficiado.responsavelNome,
                    responsavelCelular: beneficiado.responsavelCelular,
                    responsavelEmprego: beneficiado.responsavelEmprego,
                    observacoes: beneficiado.observacoes,
                    imagemPerfil: beneficiado.imagemPerfil,
                    idUsuario: beneficiado.idUsuario
                }).table('beneficiado')
                return 200;
            }else{
                return 422
            }
            
        }catch(error){
            console.log(error)
            return 403;
        }
        
    };


    async getCpf(cpf){
        try{
            let user = await knex.select(['email']).where({cpf: cpf}).table('beneficiado');
            if(user[0] === undefined){
                return 404
            }else{
                return user
            }
            
        }catch(error){
            console.log(error)
            return 404
        }
    }
};

module.exports = new Beneficiados