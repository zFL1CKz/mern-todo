const Router = require('express').Router
const todoController = require('../controllers/todo-controller')
const auth = require('../middlewares/auth-middleware')
const router = new Router()

router.get('/todos', auth, todoController.getTodos)

module.exports = router
