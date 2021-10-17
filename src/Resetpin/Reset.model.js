import ResetpinSchema from './Resetpin.schema.js'

export const createUniqueReset = (userInfo) => {
  return ResetpinSchema(userInfo).save()
}

export const findUniqueReset = (userInfo) => {
  return ResetpinSchema.findOne(userInfo)
}

export const deleteUniuquePin = async (userInfo) => {
  const result = await ResetpinSchema.findOneAndDelete(userInfo)
  return result
}
