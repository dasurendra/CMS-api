import mongoose from 'mongoose'

const ResetSchema = mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
      default: '',
    },
    email: {
      type: String,
      required: true,
      default: '',
    },
  },
  {
    timeStampe: true,
  }
)

export default mongoose.model('RestePin', ResetSchema)
