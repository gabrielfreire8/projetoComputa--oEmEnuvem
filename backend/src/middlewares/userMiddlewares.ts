const jwt = require("jsonwebtoken")
import userModel from "../models/userModel";


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
        const list: any = {};
        const cookieHeader = req.headers?.cookie;
        if (!cookieHeader) return list;

        cookieHeader.split(`;`).forEach(function(cookie: any): any {
            let [ name, ...rest] = cookie.split(`=`);
            name = name?.trim();
            if (!name) return;
            const value = rest.join(`=`).trim();
            if (!value) return;
            list[name] = decodeURIComponent(value);
        });
    let token = `${list.jwt}`
    if(!token){ return res
        .status(401)
        .json({ message: "Not authorized, token not available" })}
    if (token) {
        jwt.verify(`${token}`, process.env.JWT_SIGN_KEY, (err: any, decodedToken: any) => {
        if (err) {
            console.log(err)
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
        
    }
};
};
    


export default new userMidd;