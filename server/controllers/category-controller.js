const categoryService = require('../service/category-service')

class CategoryController {
  async getCategories(req, res, next){
    try {
      const categories = await categoryService.getCategories(req.user.id)
      return res.json(categories)
    } catch (e) {
      next(e)
    }
  }

  async addCategory(req, res, next){
    try {
      const category = await categoryService.addCategory(req)
      return res.json(category)
    } catch (e) {
      next(e)
    }
  }

  async removeCategory(req, res, next){
    try {
      const category = await categoryService.removeCategory(req.params.id)
      return res.json(category)
    } catch (e) {
      next(e)
    }
  }

  async updateCategory(req, res, next){
    try {
      const category = await categoryService.updateCategory(req)
      return res.json(category)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new CategoryController()