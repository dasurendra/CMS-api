import sessionSchema from './session.schema.js'

export const createAccessSession = (tokens) => {
  return sessionSchema(tokens).save()
}
