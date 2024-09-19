const router = require('express').Router();
import UserController from '../controllers/userControllers'
import beneficiadoController from '../controllers/benefController';
import benefMiddlewares from '../middlewares/benefMiddlewares';
import userMiddlewares from '../middlewares/userMiddlewares';
import atividadesControllers from '../controllers/atividadesControllers';
import aprovacaoAtividadesControllers from '../controllers/aprovacaoAtividadesControllers';
import aprovacaoMiddlewares from '../middlewares/aprovacaoMiddlewares';


// Usuario
router.post('/user/', UserController.create);
router.get('/user/:id', UserController.getById);
router.put('/user/', UserController.updateUser);
router.delete('/user/', userMiddlewares.checkDeletedUser, UserController.deleteUser);
router.post('/login/', UserController.login);

// Beneficiado
router.post("/account/completeCad", benefMiddlewares.checkCpf, beneficiadoController.create);
router.get("/account/:id", beneficiadoController.getBeneficiado);
router.put("/account/:id", benefMiddlewares.checkCpf, beneficiadoController.updateBeneficiado);
router.delete("/account/delete/", benefMiddlewares.checkDeletedBenef ,beneficiadoController.deleteBeneficiado);

// Atividade
router.post("/atividade/criar", atividadesControllers.new);
router.get("/atividades/", atividadesControllers.getAll);
router.get("/atividades/pendentes", atividadesControllers.getPendentes);
router.get("/atividades/aprovadas", atividadesControllers.getAprovadas);
router.put('/atividade/:id', atividadesControllers.updateAtividade);
router.delete("/atividade/apagar/:id", atividadesControllers.deleteAtividade);

// Aprovacao Atividade
router.post("/atividades/aprovar/", aprovacaoMiddlewares.checkAtividade, aprovacaoAtividadesControllers.new);
router.delete("/atividades/aprovadas/delete", aprovacaoAtividadesControllers.delete);
router.get("/atividades/aprovacoes/", aprovacaoAtividadesControllers.getAll);


export = router;
