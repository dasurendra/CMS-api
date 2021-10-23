import jwt from 'jsonwebtoken'
import { createAccessSession } from '../sessionModel/session.model.js'
import { setRefreshJWt } from '../Usermodel/user.model.js'
const createAccesstJwt = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.JWT_ACCESS_JWT, {
    expiresIn: `15m`,
  })
  const obj = {
    type: 'accessJwt',
    userId: _id,
    token,
  }
  const result = await createAccessSession(obj)
  if (result._id) {
    return token
  }
  return false
}

const refreshAccessJwt = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.JWT_REFRESH_JWT, {
    expiresIn: `30d`,
  })
  const result = await setRefreshJWt(_id, token)
  if (result._id) {
    return token
  }
  return false
}

export const getJwt = async (userInfo) => {
  const accessJwt = await createAccesstJwt(userInfo)
  const refreshJwt = await refreshAccessJwt(userInfo)
  return { accessJwt, refreshJwt }
}
