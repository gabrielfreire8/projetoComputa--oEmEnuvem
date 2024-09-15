
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                    const user = await User.new(nome.toCapi, usuario.toLowerCase(), hash, funcao);
                    if(user === 409){
                        return res.status(user).json({
                            message : "Usuário já cadastrado"
                        })
                    }
                    if(user === 404){
                        return res.status(200).json({
                            message : "Erro no cadastro"
                        })
                    }
                    let newUser = await User.getByID(user[0]);
                    return res.status(200).json({
                        id: user[0],
                        message: "Usuário cadastrado com sucesso",
                        user: newUser[0]
                    });

                })
                    
                })
            }catch(error){
            return res.status(400).json({
                message: error
                });
            };
        };

    async getById(req, res){
        try{
            let { id } = req.body;
            let user = await User.getByID(id) ;
            return res.status(200).json(user[0]);
        }
        catch(error){
            return res.status(404).json({
                message: "Erro ao retornar usuário"
            });
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
            let user = req.body;
            let userHash = await User.getByID(user.id);
            await bcrypt.compare(user.senha, userHash[0].senha, (error, result) => {
                if(error){
                    return 400
                };
                if(result === true){
                    User.deleteUser(user.id);
                    return res.status(200).json({
                        message: "Usuário apagado com sucesso"
                    })
                }else{
                    return res.status(400).json({
                        message: "Error! As informações do usuário não conferem"
                    });
                };
            });
        }catch(error){
            return res.status(404).json({
                message: "Usuário não pode ser excluido"
            });
        };
    };

    async login(req, res){
        try{
            let {usuario, password} = req.body;
            let user = await User.getByUser(usuario);
            if(user.status === true){
            await bcrypt.compare(password, user.values.senha, async (error, result) => {
                if(error){ 
                    return res.status(400).json({
                    message: "Error! Valores não conferem!"
                })}else if(!result){
                    return res.status(401).json({
                        Message: "Error! Invalid Credentials"
                    });
                };
                let token = await jwt.sign({id: user.values.idusuarios,
                    nome: user.values.nome,
                    funcao: user.values.funcao
                }, process.env.JWT_SIGN_KEY, {expiresIn: "4h"});

                return res.status(200).json({auth: true, 
                    token: {token}});
            });
            }else{
                return res.status(404).send({
                    message: "Usuário não pode ser encontrado!"
                });
            };
        }catch(error){
            console.log(error)
            return res.status(403).json({ 
                message: "erro ao fazer login",
                error: error});
        };
        

    };
};

module.exports = new UserController