
const userModel = require("../models/userModel");

class userMidd{
    async checkDeletedUser(req, res, next){
        let user = await userModel.getByID(req.body.id)
        if(user.length === 0){
            return res.status(404).json({
                message: "Usuário já apagado/não criado"
            });
        }
        next()
    };
    
};


module.exports = new userMidd