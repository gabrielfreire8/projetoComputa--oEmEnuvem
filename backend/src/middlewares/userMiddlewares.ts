
import userModel from "../models/userModel";
const jwt = require('jsonwebtoken');

class userMidd{
    async checkDeletedUser(req:any, res:any, next:any){
        let user = await userModel.getByID(req.body.id)
        if(user.length === 0){
            return res.status(404).json({
                message: "Usuário já apagado/não criado"
            });
        }
        next()
    };
    

    async authAdmin(req: any, res: any, next: any){
        const jwt = require("jsonwebtoken")
        const token = req.cookies.jwt
        if (token) {
            jwt.verify(token, process.env.JWT_SIGN_KEYN, (err: any, decodedToken: any) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.administrator !== true) {
                return res.status(401).json({ message: "Not authorized" })
                } else {
                next()
                }
            }
            })
        } else {
            return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
        }
    };
};


export default new userMidd;