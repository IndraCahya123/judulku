//models
const { User } = require('../../models')

//library
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const joi = require('joi')

exports.loginMhs = async (req, res) => {
  try {
    const { email, password } = req.body

    //validate input user
    const schema = joi.object({
      email: joi.string().email().min(11).max(50).required(),
      password: joi.string().min(8).max(50).required(),
    })

    //in there're invalid input
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(403).send({
        status: 'Error',
        message: error.details[0].message,
      })
    }

    //check user by email
    const user = await User.findOne({
      where: {
        email,
      },
    })

    //if user not found
    if (!user) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Invalid email or password',
      })
    }

    //compare password with hashed password and check it
    const validPassword = await bcrypt.compare(password, user.password)

    //if password invalid
    if (!validPassword) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Invalid email or password',
      })
    }

    if (user.role !== 'mahasiswa') {
      return res.status(403).send({
        status: "Failed",
        message: "This is login for Mahasiswa"
      })
    }

    //generate token for api authorization with jsonwebtoken
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
    )

    //data response
    res.send({
      status: 'Login Success',
      message: 'You are success to login',
      data: {
        user: {
          id: user.id,
          email,
          role: user.role,
          token,
        },
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'Error',
      message: 'Something wrong with database',
      error,
    })
  }
}

exports.loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body

    //validate input user
    const schema = joi.object({
      email: joi.string().email().min(11).max(50).required(),
      password: joi.string().min(8).max(50).required(),
    })

    //in there're invalid input
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(403).send({
        status: 'Error',
        message: error.details[0].message,
      })
    }

    //check user by email
    const user = await User.findOne({
      where: {
        email,
      },
    })

    //if user not found
    if (!user) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Invalid email or password',
      })
    }

    //compare password with hashed password and check it
    const validPassword = await bcrypt.compare(password, user.password)

    //if password invalid
    if (!validPassword) {
      return res.status(404).send({
        status: 'Failed',
        message: 'Invalid email or password',
      })
    }
    
    if (user.role === 'mahasiswa') {
      return res.status(403).send({
        status: "Failed",
        message: "This is login for Staff"
      })
    }

    //generate token for api authorization with jsonwebtoken
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
    )

    //data response
    res.send({
      status: 'Login Success',
      message: 'You are success to login',
      data: {
        user: {
          id: user.id,
          email,
          role: user.role,
          token,
        },
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'Error',
      message: 'Something wrong with database',
      error,
    })
  }
}

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId.id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })

    res.send({
      status: 'success',
      message: 'User Valid',
      data: {
        user: {
          ...user.dataValues,
          token: user.token,
        },
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}
