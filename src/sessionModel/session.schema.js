import mongoose from 'mongoose'

const SessionSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      default: '',
    },
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
)

export default mongoose.model('Session', SessionSchema)
