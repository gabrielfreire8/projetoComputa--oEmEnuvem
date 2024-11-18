
import User  from '../models/userModel';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController{
    async create(req: any, res: any ){
        let {nome, usuario, senha, funcao} = req.body;
        const salts = 10;
        try{
            await bcrypt.genSalt(salts, (error: string, salt: any) => {
                if(error){
                    return error
                }
                bcrypt.hash(senha, salt, async (error:string, hash:string) => {
                    if(error) return 400
                    const user = await User.new(nome, usuario.toLowerCase(), hash, funcao);
                    if(user === 409){
                        return res.status(user).json({
                            message : "Usuário já cadastrado"
                        })
                    }
                
                    if(user === 404){
                        return res.status(200).json({
                            message : "Erro no cadastro"
                        })
                    };
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

    async getById(req:any, res:any){
        try{
            let { id } = req.params;
            let user = await User.getByID(id);
            return res.status(200).json(user[0]);
        }
        catch(error){
            return res.status(404).json({
                message: "Erro ao retornar usuário"
            });
        };
    };

    async updateUser(req:any, res:any){
        let {id, nome, usuario, senha, funcao} = req.body;
        const salts = 10;
        await bcrypt.genSalt(salts, (error:string, salt:string) => {
        try{
            if(error){
                return res.status(403).json({})
            }
            bcrypt.hash(senha, salt, async (error:string, hash:string) => {
                if(error){
                    return res.status(400).json({
                        message: "Error"
                    })
                }
                await User.updateUser(id ,nome, usuario, hash, funcao);
                let user = await User.getByID(id);
                if(user){
                    return res.status(200).json({
                    message: `Usuário ID: ${req.body.id} Atualizado com sucesso`,
                    user
                })
            }else{
                return res.status(404).json({
                    error: "Usuário não encontrado"
                })
            }                              
            })
        }
        catch(
            error){console.log(error)
            return res.status(403).json({
                message: "não autorizado",
            });
        };
    
    })
    }


    async deleteUser(req:any, res:any){
        try{
            let user = req.body;
            let userHash = await User.getByID(user.id);
            await bcrypt.compare(user.senha, userHash.senha, (error:string, result:boolean) => {
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
            console.log(error)
            return res.status(404).json({
                message: "Usuário não pode ser excluido"
            });
        };
    };

    async login(req:any, res:any){
        try{
            let {email, password} = req.body;
            let user: any = await User.getByUser(email);
            if(user.status === true){
            await bcrypt.compare(password, user.values.senha, async (error: string, result:boolean) => {
                if(error){ 
                    return res.status(400).json({
                    message: "Error! Valores não conferem!"
                })}else if(result === false){
                    return res.status(401).json({
                        Message: "Error! Invalid Credentials"
                    });
                };
                if(user.values.funcao === "administrador"){
                    let token = await jwt.sign({id: user.values.idusuario,
                        nome: user.values.nome,
                        administrator: true
                    }, process.env.JWT_SIGN_KEY, {expiresIn: "4h"});
                    return res.status(200).json({auth: true, 
                        token: {token}});
                }
                
                let token = await jwt.sign({id: user.values.idusuario,
                    nome: user.values.nome,
                    funcao: user.values.funcao
                }, process.env.JWT_SIGN_KEY, {expiresIn: "4h"});
                return res.status(200).json({auth: true, 
                    barrel: {token}});
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


export default new UserController
