const todoService = require('../service/todo-service')

class TodoController {
  async getTodos(req, res, next){
    try {
      const todos = await todoService.getTodos(req.user.id)
      return res.json(todos)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new TodoController()