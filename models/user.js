const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 12
  },
  passwordHash: String,
  notes: [
    {
      notes: mongoose.Types.ObjectId,
      key: 'Note'
    }]

})

userSchema.set('toJSON', {
  transform: (doc,ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  }
})

module.exports = mongoose.model('User',userSchema)