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
