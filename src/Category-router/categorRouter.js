import express from 'express'
import slugify from 'slugify'
import { categoryValidator } from '../middleware/user.validator.js'
const router = express.Router()
import {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
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
      parentCat,
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
    res.status(500).json({
      staus: 'error',
      message: msg,
    })
  }
})

//delete category

router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params
    if (_id) {
      const result = await deleteCategory(req.body)

      if (result?._id) {
        return res.json({
          status: 'success',
          message: 'Category has been delted',
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.json({
      status: 'error',
      message: 'Unable to delete the category this time',
    })
  }
})

//update the category

router.patch('/:_id', async (req, res) => {
  try {
    const { _id } = req.body

    if (_id) {
      const result = await updateCategory(req.body)
      if (result?._id) {
        return res.json({
          status: 'success',
          message: 'It has been updated',
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.json({
      status: 'error',
      message: 'Sorry,unable to update',
    })
  }
})

export default router
