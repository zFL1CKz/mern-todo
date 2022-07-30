const Router = require('express').Router
const todoController = require('../controllers/todo-controller')
const auth = require('../middlewares/auth-middleware')
const router = new Router()

router.get('/gettodos', auth, todoController.getTodos)
router.post('/addtodo', auth, todoController.addTodo)
router.delete('/deletetodo/:id', auth, todoController.removeTodo)
router.put('/updatetodo/:id', auth, todoController.updateTodo)

module.exports = router
