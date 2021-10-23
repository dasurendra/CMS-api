import userSchema from './userSchema.js'
import UserSchema from './userSchema.js'

export const createUser = async (newUser) => {
  return await UserSchema(newUser).save()
}

export const userActive = async (email) => {
  return UserSchema.findOneAndUpdate(
    { email },
    { status: 'active', isEmailConfirm: true },
    { new: true }
  )
}

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email })
}

export const setRefreshJWt = async (_id, refreshJWT) => {
  return await userSchema.findByIdAndUpdate(_id, {
    refreshJWT,
  })
}
