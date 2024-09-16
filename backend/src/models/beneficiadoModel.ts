import {knex} from '../data/connection';

class Beneficiados{
    async new(beneficiado: {
        idUsuarios: number,
        cpf: string,
        dataNascimento: string,
        genero: string,
        cidade: string,
        logradouro: string,
        bairro: string,
        cep: string,
        telefone: string,
        email: string,
        condicoesMed: string,
        alergias: string,
        restricoes: string,
        necEspeciais: string,
        responsavelNome: string,
        responsavelCelular: string,
        responsavelEmprego: string,
        observacoes: string,
        imagemPerfil: string
    }){
        try{
                await knex.insert({
                    idUsuarios: beneficiado.idUsuarios,
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
                    imagemPerfil: beneficiado.imagemPerfil
                }).table('beneficiado');
                return 200;    
        }catch(error){
            console.log(error)
            return 403;
        }
        
    };


    async getCpf(cpf: string){
        try{
            let user = await knex.select(['email']).where({cpf: cpf}).table('beneficiado');
            if(user.length === 0){
                return 404;
            }else{
                return user;
            };
            
        }catch(error){
            return 404;
        };
    };

    async getBeneficiadoById(id: number){
        try{
            let user = await knex.select('*').where({idUsuarios: id}).table('beneficiado')
            return user
        }catch(error){
            return 404}
    }

    async updateBeneficado(id: number, beneficiado: any){
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
                    idUsuarios: beneficiado.idUsuario
            }).where({idBeneficiados: id}).table('beneficiado');
            return user;
        }catch(error){
            return 404;
        };
    };

    async deleteBeneficiado(id:number){
        try{
            let excludeUser = await knex.delete().where({idUsuarios: id}).table('beneficiado')
            return excludeUser;
        }catch(error){return error};
    };
};

export default new Beneficiados;