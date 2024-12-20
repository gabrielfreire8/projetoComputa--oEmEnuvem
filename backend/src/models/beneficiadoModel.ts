import { StringMappingType } from 'typescript';
import {knex} from '../data/connection';

class Beneficiados{
    async new(beneficiado: {
        nome: string,
        cpf: string, 
        dataNascimento: string,
        telefone: string,
        email: string,
        cep: string,
        rua: string,
        numero: number,
        bairro: string,
        cidade: string
    }){
        try{
                await knex.insert({
                    nome: beneficiado.nome,
                    cpf: beneficiado.cpf,
                    dataNascimento: beneficiado.dataNascimento,
                    telefone: beneficiado.telefone,
                    email: beneficiado.email,
                    cep: beneficiado.cep,
                    enderecoRua: beneficiado.rua,
                    enderecoNumero: beneficiado.numero,
                    enderecoBairro: beneficiado.bairro,
                    cidade: beneficiado.cidade
                }).table('participantes');
                return 200;    
        }catch(error){
            console.log(error)
            return 403;
        }
        
    };

    async getBeneficiados(){
        try{
            let participantes = await knex.select(['nome', 'cpf']).table('participantes');
            return participantes
        }catch(error){
            console.log(error)
            return 404
        }
    };
    async getByID(id: number){
        try{
            let beneficiado = await knex.select(['nome', 'cpf']).where({idparticipantes: id}).table('participantes');
            return beneficiado
        }catch(error){
            return error
        }
    }
    async getCpf(cpf: string){
        try{
            let user = await knex.select(['email']).where({cpf: cpf}).table('participantes');
            if(user.length === 0){
                return 404;
            }else{
                return user;
            };
            
        }catch(error){
            return 404;
        };
    };

    async getBeneficiadoByCpf(cpf: number){
        try{
            let user = await knex.select('*').where({cpf: `${cpf}`}).table('participantes')
            return user
        }catch(error){
            return 404}
    }

    async updateBeneficado(beneficiado: any){
        try{
            let user = await knex.update({
                nome: beneficiado.nome,
                cpf: beneficiado.cpf,
                dataNascimento: beneficiado.dataNascimento,
                telefone: beneficiado.telefone,
                email: beneficiado.email,
                cep: beneficiado.cep,
                enderecoRua: beneficiado.rua,
                enderecoNumero: beneficiado.numero,
                enderecoBairro: beneficiado.bairro,
                cidade: beneficiado.cidade
            }).where({cpf: beneficiado.cpf}).table('participantes');
            return user;
        }catch(error){
            return 404;
        };
    };

    async deleteBeneficiado(id:number){
        try{
            let excludeUser = await knex.delete().where({idparticipantes: id}).table('participantes')
            return excludeUser;
        }catch(error){return error};
    };
};

export default new Beneficiados;