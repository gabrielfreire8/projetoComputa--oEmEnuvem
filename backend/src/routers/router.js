const router = require('express').Router();
const userController = require('../controllers/userControllers');

router.post("/user/", userController.create)
router.get('/user/', userController.getById)

module.exports = router
