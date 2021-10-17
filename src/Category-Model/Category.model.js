import CategorySchema from './Category.schema.js'

export const getCategory = () => {
  return CategorySchema.find()
}

export const createCategory = (newCategory) => {
  return CategorySchema(newCategory).save()
}

export const deleteCategory = (_id) => {
  return CategorySchema.findByIdAndDelete(_id)
}

export const updateCategory = (_id) => {
  return CategorySchema.findByIdAndUpdate(_id)
}
