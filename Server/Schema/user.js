const mongoose = require('mongoose')

// For Hashing Password
const bcrypt = require('bcryptjs')

const  validator = require('validator')

// Generating Token
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true
  }, 
  email : {
    type: String,
    required: true,
    trim : true,
    lowercase : true,
    validate : {
      validator : validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false
    }
  },
  age: {
    type: Number,
    default: 18,
    validate(value) {
      if (value <= 0) {
        throw new Error("Age must be greater than 0")
      }
    }
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  Certificates : [
  {
    filename : {
      type: String,
      default: null
    },
    status : {
      type : Number,
      default : 0
    }, 
    message : {
      type : String,
      default : null
      }
    }
  ],
  ProfileImage : {
    type : String,
    default : null
  }
})


// Generating Auth token
userSchema.methods.generateAuthToken = async function () { 
  try {
      const token = jwt.sign({_id : this._id}, process.env.SECRETKEY)
      this.tokens = this.tokens.concat({ token : token })
      await this.save()
      return token
  } 
  catch (err) {
    console.log(err)
  }
}


// Hash The plain text password before saving into database
userSchema.pre('save', async function (next) {
  
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }

  next() 
})

const User = mongoose.model('User', userSchema)

module.exports = User