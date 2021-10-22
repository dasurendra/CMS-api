import express from 'express'
import slugify from 'slugify'
import {
  categoryValidator,
  validatorEdit,
} from '../middleware/user.validator.js'
const router = express.Router()
import {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
  editcategory,
} from '../Category-Model/Category.model.js'

router.all('/', (req, res, next) => {
  console.log('sent from cat')
  next()
})
router.get('/', async (req, res) => {
  try {
    const categories = await getCategory(req.body)
    return res.json({
      status: 'success',
      message: 'Here are all your categor',
      categories,
    })
  } catch (error) {
    console.log(error)
    res.json({
      status: 'error',
      message: 'unable to find the catgory',
    })
  }
})

//create category
router.post('/', categoryValidator, async (req, res) => {
  try {
    console.log(req.body)
    const { name, parentCat } = req.body

    const slug = slugify(name, { lower: true })
    const newCat = {
      name,
      slug,
      parentCat: parentCat ? parentCat : null,
    }

    const result = await createCategory(newCat)
    if (result?._id) {
      return res.json({
        status: 'success',
        message: 'New category has been added',
        result,
      })
    }
    res.json({
      staus: 'error',
      message: 'Unable to process your request,Please Try again later',
    })
  } catch (error) {
    console.log(error)
    let msg = 'Error,unable to process your request,Please Try again later'

    if (error.message.includes('E11000 duplicate key error collection')) {
      msg = 'This Category already exists '
    }
    res.json({
      staus: 'error',
      message: msg,
    })
  }
})

//update category

router.patch('/', validatorEdit, async (req, res) => {
  try {
    const { parentCat } = req.body

    req.body.parentCat = parentCat ? parentCat : null
    const result = await editcategory(req.body)
    if (result?._id) {
      return res.json({
        status: 'success',
        message: 'The category has been updated',
      })
    }
    res.json({
      status: 'error',
      message: 'Unable to update this time',
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      status: 'error',
      message: 'Error, Unable to process your request please try again later',
    })
  }
})

//delete category

router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params
    if (_id) {
      const result = await deleteCategory(_id)

      if (result?._id) {
        return res.json({
          status: 'success',
          message: 'Category has been delted',
        })
      }
    }
    res.json({
      status: 'error',
      message: 'Unable to delete the category, please try again later',
    })
  } catch (error) {
    console.log(error)
    res.json({
      status: 'error',
      message: 'Unable to delete the category this time',
    })
  }
})

export default router
