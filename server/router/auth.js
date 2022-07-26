const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = new Router()
const {body} = require('express-validator')
// const auth = require('../middlewares/auth-middleware')
// нужен для проверки авторизации
// подключается до контроллера

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 24}),
  userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

module.exports = router