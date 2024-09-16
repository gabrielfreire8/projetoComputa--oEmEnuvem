const router = require('express').Router();
import UserController from '../controllers/userControllers'
import beneficiadoController from '../controllers/benefController';
import benefMiddlewares from '../middlewares/benefMiddlewares';
import userMiddlewares from '../middlewares/userMiddlewares';
import atividadesControllers from '../controllers/atividadesControllers';

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
export = router
