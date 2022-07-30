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

  async addTodo(req, res, next){
    try {
      const todo = await todoService.addTodo(req)
      return res.json(todo)
    } catch (e) {
      next(e)
    }
  }

  async removeTodo(req, res, next){
    try {
      const todo = await todoService.removeTodo(req.params.id)
      return res.json(todo)
    } catch (e) {
      next(e)
    }
  }

  async updateTodo(req, res, next){
    try {
      const todo = await todoService.updateTodo(req)
      return res.json(todo)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new TodoController()