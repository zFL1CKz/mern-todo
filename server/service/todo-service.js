const TodoModel = require('../models/todo-model')
const ApiError = require('../exceptions/api-error')

class TodoService {
  async getTodos(userId) {
    const todos = await TodoModel.find({$or: [{user: userId}, {user: null}]})
    return todos
  }

  async addTodo(req) {
    const {name, desc, priority, timestamp, categoryId} = req.body
    const todo = await TodoModel.create({user: req.user.id, name, desc, priority, timestamp, category: categoryId})
    await todo.save()

    return todo
  }

  async removeTodo(todoId) {
    const todo = await TodoModel.findByIdAndDelete(todoId)
    if(!todo){
      throw ApiError.BadRequest('Ошибка при удалении задачи')
    }
    return todo
  }

  async updateTodo(req) {
    const {name, desc, priority, timestamp, categoryId, isCompleted} = req.body
    const todo = await TodoModel.findByIdAndUpdate(req.params.id, {name, desc, priority, isCompleted, timestamp, category: categoryId})

    if(!todo){
      throw ApiError.BadRequest('Ошибка при изменении задачи')
    }

    await todo.save()

    return todo
  }
}

module.exports = new TodoService()