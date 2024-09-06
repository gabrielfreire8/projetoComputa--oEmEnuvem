const knex = require('../data/connection');

class Beneficiados{
    async new(beneficiado){
        try{
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
                }).where({idBeneficiados: beneficiado.id}).table('beneficiado')
                return 200;    
        }catch(error){
            console.log(error)
            return 403;
        }
        
    };


    async getCpf(cpf){
        try{
            let user = await knex.select(['email']).where({cpf: cpf}).table('beneficiado');
            if(user.length === 0){
                return 404;
            }else{
                return user;
            };
            
        }catch(error){
            console.log(error)
            return 404;
        };
    };

    async getBeneficiadoById(id){
        try{
            let user = await knex.select('*').where({idBeneficiados: id}).table('beneficiado')
            return user
        }catch(error){
            console.log(error)
            return 404}
    }

    async updateBeneficado(id, beneficiado){
        try{
            let user = await knex.update({
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
            }).where({idBeneficiados: id}).table('beneficiado');
            return user;
        }catch(error){
            console.log(error)
            return 404;
        };
    };
};

module.exports = new Beneficiados;