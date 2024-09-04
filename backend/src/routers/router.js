const router = require('express').Router();
const userController = require('../controllers/userControllers');

router.post('/user/', userController.create);
router.get('/user/', userController.getById);
router.put('/user/', userController.updateUser);
router.delete('/user/', userController.deleteUser);


module.exports = router
