import atividadesModel from "../models/atividadesModel";

class ApproveMiddlewares{
    async checkAtividade(req: any, res: any, next: any){
        try{
            let atividade = await atividadesModel.getByID(req.body.idAtividade);
            if(atividade === true){
                next()
            }else{
                return res.status(404).json({
                    status: false,
                    Message: "Atividade nao encontrada"
                })
            }
        }catch(error){
            return res.status(400).json({
                message: "Error",
                error
            })
        }   
    }
}


export default new ApproveMiddlewares