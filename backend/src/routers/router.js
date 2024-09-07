const router = require('express').Router();
const userController = require('../controllers/userControllers');
const beneficiadoController = require('../controllers/benefController');
const benefMiddlewares = require('../middlewares/benefMiddlewares');


// Usuario
router.post('/user/', userController.create);
router.get('/user/', userController.getById);
router.put('/user/', userController.updateUser);
router.delete('/user/', userController.deleteUser);

// Beneficiado
router.post("/account/completeCad", benefMiddlewares.checkCpf, beneficiadoController.create);
router.get("/account/:id", beneficiadoController.getBeneficiado);
router.put("/account/:id", benefMiddlewares.checkCpf, beneficiadoController.updateBeneficiado);
router.delete("/account/delete/", benefMiddlewares.checkDeletedBenef ,beneficiadoController.deleteBeneficiado);
module.exports = router
