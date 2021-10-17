import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: 'active',
    },
    name: {
      type: String,
      required: true,
      default: '',
      maxLength: 30,
    },
    slug: {
      type: String,
      required: true,
      maxLength: 30,
      unique: true,
      index: 1,
    },
    parentCat: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timeStamps: true,
  }
)

export default mongoose.model('Category', categorySchema)
