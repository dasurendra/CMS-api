import express from 'express'

import {
  createUser,
  userActive,
  getUserByEmail,
} from '../Usermodel/user.model.js'
import {
  newUserFormValidation,
  userValidaion,
  adminLoginValidation,
} from '../middleware/user.validator.js'
import { hashPassword, verifyPassowrd } from '../../src/helper/bcrypt.helper.js'
import { getRandomOtp } from '../helper/otpgenrator.js'
import {
  createUniqueReset,
  findUniqueReset,
  deleteUniuquePin,
} from '../Resetpin/Reset.model.js'
import { emailProcessor, emailVerification } from '../helper/mailhelper.js'
import { getJwt } from '../helper/jwt.helper.js'
const router = express.Router()

router.all('/', (req, res, next) => {
  next()
})

router.post('/', newUserFormValidation, async (req, res) => {
  try {
    const hasspss = hashPassword(req.body.password)
    req.body.password = hasspss
    const result = await createUser(req.body)
    if (result?._id) {
      const otplength = 8
      const otp = getRandomOtp(otplength)
      const uniqueCombo = {
        otp,
        email: result.email,
      }
      const data = await createUniqueReset(uniqueCombo)
      if (data?._id) {
        emailProcessor(uniqueCombo)
      }

      res.json({
        status: 'success',
        message: 'User has Been Created succesfully.',
        result,
      })
    }
  } catch (error) {
    console.log(error)
    let msg = 'Unable to create user this time,Please Try Again later'

    if (error.message.includes('E11000 duplicate key error collection')) {
      res.json({
        status: 'error',
        message: 'Email address already associate with us',
      })
    }

    res.json({ status: 'error', message: msg })
  }
})

router.post('/email-verification', userValidaion, async (req, res) => {
  try {
    const result = await findUniqueReset(req.body)
    if (result?._id) {
      const isUserActive = await userActive(req.body.email)
      if (isUserActive?._id) {
        emailVerification(req.body.email)
        deleteUniuquePin(req.body)
        return res.json({
          status: 'success',
          message: 'Welcome and you may sign in now',
        })
      }
    }
    res.json({
      status: 'error',
      message: 'invalid link or expired',
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/login', adminLoginValidation, async (req, res) => {
  try {
    const { email, password } = req.body
    //1 find user by email
    const user = await getUserByEmail(email)
    if (user?._id) {
      const isPassMatched = verifyPassowrd(password, user.password)

      if (isPassMatched) {
        user.password = undefined
        const tokens = await getJwt({ _id: user._id, email })
        return res.json({
          status: 'success',
          message: ' login SuccesFull',
          user,
          tokens,
        })
      }
    }
    res.json({
      status: 'error',
      message: 'Email or paswword didnt match ,Try Again Later',
    })
  } catch (error) {
    console.log(error)
    res.json({
      status: 'error',
      message: 'Error,unable to login now',
    })
  }
})

export default router
