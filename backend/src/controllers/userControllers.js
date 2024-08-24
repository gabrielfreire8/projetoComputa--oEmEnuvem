const User = require('../models/userModel');


class UserController{
    async create(req, res){

        let {nome, usuario, senha, funcao} = req.body;
    
        try{
            const user = await User.new(nome, usuario, senha, funcao);
            if(user === 200){
                return res.status(200).json({
                    message : "Usuário cadastrado com sucesso"
                })
            }else if(user === 409){
                return res.status(user).json({
                    message : "Usuário já cadastrado"
                })
            }else{
                return res.status(400).json({
                    message: "Erro na requisição"
                })
            }

        }catch(error){
            console.log(error)
            return res.status(400).json({
                message: error
                });
            };
        };

    async getById(req, res){
        try{
            let {id} = req.body
            let user = await User.getByID(id) 
            return res.status(200).send({user})
        }
        catch(error){
            return res.status(404).json({
                message: "Erro ao retornar usuário"
            })
        }
    }


}

module.exports = new UserController