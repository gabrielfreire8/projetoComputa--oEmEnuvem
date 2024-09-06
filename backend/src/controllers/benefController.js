const beneficiadoModel = require("../models/beneficiadoModel");
const Beneficiado = require("../models/beneficiadoModel");

class BeneficiadoControllers{
    async create(req, res){
        try{
            let {cpf, dataNascimento, genero, cidade, logradouro,
                bairro, cep, telefone, email, condicoesMed, alergias,
                restricoes, necEspeciais, responsavelNome, responsavelCelular, responsavelEmprego,
                observacoes, imagemPerfil, idUsuario} = req.body
        
                let benef = {cpf, dataNascimento, genero, cidade, logradouro,
                    bairro, cep, telefone, email, condicoesMed, alergias,
                    restricoes, necEspeciais, responsavelNome, responsavelCelular, responsavelEmprego,
                    observacoes, imagemPerfil, idUsuario};
        
                let cad = await beneficiadoModel.new(benef);
                if(cad === 200){
                    return res.status(200).json({
                        message: "cadastro completo com sucesso"
                    });

                }else{
                    return res.status(403).json({
                        message: "Bad request"
                    });
                };
        }catch(error){
            return res.status(403).json({
                message: "Bad request"
            });
        };
    };
}


module.exports = new BeneficiadoControllers;
