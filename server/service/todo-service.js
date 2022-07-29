const TodoModel = require('../models/todo-model')
const UserDto = require('../dtos/user-dto')

class TodoService {
  async getTodos(userId) {
    const todos = await TodoModel.find({$or: [{user: userId}, {user: null}]})
    return {todos, UserDto}
  }
}

module.exports = new TodoService()