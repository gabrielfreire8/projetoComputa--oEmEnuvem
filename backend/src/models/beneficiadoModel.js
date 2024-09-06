const knex = require('../data/connection');

class Beneficiados{
    async new(beneficiado){
        try{
            let cad = await knex.insert({
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
            console.log(cad)
            return 200


        }catch(error){
            console.log(error)
            if(error.code === "ER_DUP_ENTRY"){
                return 409
            } 
            return 404;
        }
        
    };
};

module.exports = new Beneficiados