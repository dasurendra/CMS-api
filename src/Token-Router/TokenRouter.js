import express from 'express'
const router = express.Router()
import { verifyRefreshJWT, createAccesstJwt } from '../helper/jwt.helper.js'
import { getUser } from '../Usermodel/user.model.js'

router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers

    if (authorization) {
      const decoded = verifyRefreshJWT(authorization)
      console.log(decoded)
      if (decoded?.email) {
        const user = await getUser({
          email: decoded.email,
          refreshJWT: authorization,
        })

        if (user._id) {
          const accessJWT = await createAccesstJwt({
            _id: user._id,
            email: user.email,
          })
          return res.json({
            status: 'success',
            message: 'New acces token has been generated',
            accessJWT,
          })
        }
      }

      res.status(401).json({
        status: 'error',
        message: 'invalid Token',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'internal server error',
    })
  }
})

export default router
