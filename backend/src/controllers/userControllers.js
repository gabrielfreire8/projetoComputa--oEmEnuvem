const User = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserController{
    async create(req, res){

        let {nome, usuario, senha, funcao} = req.body;
        const salts = 10
        try{
            await bcrypt.genSalt(salts, (error, salt) => {
                if(error){
                    return error
                }
                bcrypt.hash(senha, salt, async (error, hash) => {
                    if(error) return 400
                    const user = await User.new(nome, usuario, hash, funcao);
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
                })
            });
            

        }catch(error){
            console.log(error)
            return res.status(400).json({
                message: error
                });
            };
        };

    async getById(req, res){
        try{
            let { id } = req.body;
            let user = await User.getByID(id) 
            return res.status(200).send({user})
        }
        catch(error){
            return res.status(404).json({
                message: "Erro ao retornar usuário"
            })
        };
    };

    async updateUser(req, res){
        try{
            await User.updateUser(req.body)
            let user = await User.getByID(req.body.id);
            return res.status(200).json({
                message: `Usuário ID: ${req.body.id} Atualizado com sucesso`,
                user
            });
        }
        catch(
            error){console.log(error)
            return res.status(403).json({
                message: "não autorizado",
            });
        };
    };

    async deleteUser(req, res){
        try{
            let {id, usuario} = req.body;
            let userDeletado = await User.deleteUser(id, usuario);
            
            return res.status(200).json({
                message: "usuario deletado com sucesso",
                userDeletado
            });
        }catch(error){return res.status(403).json({
            message: "não autorizado"
        })};
    };
};

module.exports = new UserController