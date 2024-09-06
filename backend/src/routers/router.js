const router = require('express').Router();
const userController = require('../controllers/userControllers');
const beneficiadoController = require('../controllers/benefController');


// Usuario
router.post('/user/', userController.create);
router.get('/user/', userController.getById);
router.put('/user/', userController.updateUser);
router.delete('/user/', userController.deleteUser);

// Beneficiado
router.post("/account/completeCad", beneficiadoController.create);

module.exports = router
