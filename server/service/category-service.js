const CategoryModel = require('../models/category-model')
const ApiError = require('../exceptions/api-error')

class CategoryService {
  async getCategories(userId) {
    const categories = await CategoryModel.find({$or: [{user: userId}, {user: null}]})
    return categories
  }

  async addCategory(req) {
    const {name, icon, color} = req.body
    const category = await CategoryModel.create({name, icon, color, user: req.user.id})
    await category.save()

    return category
  }

  async removeCategory(categoryId) {
    const category = await CategoryModel.findByIdAndDelete(categoryId)
    if(!category){
      throw ApiError.BadRequest('Ошибка при удалении категории')
    }
    return category
  }

  async updateCategory(req) {
    const {name, icon, color} = req.body
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, {name, icon, color})
    if(!category){
      throw ApiError.BadRequest('Ошибка при изменении категории')
    }
    await category.save()

    return category
  }
}

module.exports = new CategoryService()