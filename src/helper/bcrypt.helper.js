import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashPassword = (plainpass) => {
  return bcrypt.hashSync(plainpass, saltRounds)
}

export const verifyPassowrd = (plainpass, hashPassFromDb) => {
  return bcrypt.compareSync(plainpass, hashPassFromDb)
}
