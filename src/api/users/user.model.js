const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const config = {
  secret: 'thisismysecret'
}

const Token = require('./token.model')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      name: 'email',
      index: true
    },
    firstName: {
      type: String,

      max: 100
    },
    lastName: {
      type: String,
      max: 100
    },
    password: {
      type: String,
      required: 'Please enter your Password '
    },
    image: String
  },
  { timestamps: true }
)

// userSchema.pre('save', function (next) {
//   const user = this

//   if (!user.isModified('password')) return next()

//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) return next(err)

//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err)

//       user.password = hash
//       next()
//     })
//   })
// })

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateJWT = function () {
  // const today = new Date()
  // const expirationDate = new Date(today)
  // expirationDate.setDate(today.getDate() + 60)

  // const payload = {
  //   subject: this._id,
  //   id: this._id,
  //   email: this.email,
  //   username: this.username,
  //   firstName: this.firstName,
  //   lastName: this.lastName
  // }

  // return jwt.sign(payload, process.env.JWT_SECRET, {
  //   expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  // })
  const timeStamp = new Date().getTime()
  // return jwt.encode({sub:user.id,iat:timeStamp},config.secret);
  return jwt.sign({ subject: this._id, iat: timeStamp, expiresIn: '10000 days' }, config.secret)
}

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordExpires = Date.now() + 3600000 // expires in an hour
}

userSchema.methods.generateVerificationToken = function () {
  const payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString('hex')
  }

  return new Token(payload)
}

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('email:email must be unique'))
  } else {
    next(error)
  }
})

userSchema.index({ url: 1 })

module.exports = mongoose.model('user', userSchema)
