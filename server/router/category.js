const Router = require('express').Router
const categoryController = require('../controllers/category-controller')
const auth = require('../middlewares/auth-middleware')
const router = new Router()

router.get('/getcategories', auth, categoryController.getCategories)
router.post('/addcategory', auth, categoryController.addCategory)
router.delete('/deletecategory/:id', auth, categoryController.removeCategory)
router.put('/updatecategory/:id', auth, categoryController.updateCategory)

module.exports = router
