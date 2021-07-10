//models
const { User, Profile, Judul, DetailJudul } = require('../../models')

//library
const joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//global user action
exports.deleteUser = async (req, res) => {
  try {
    const userLogged = req.userId.id
    const { id } = req.params

    //check if the user is admin
    const getAdmin = await User.findOne({
      where: {
        id: userLogged,
      },
    })

    if (getAdmin.role !== 'admin') {
      return res.status(403).send({
        status: 'Forbidden',
        message: 'You are forbidden to use this route',
      })
    }

    const userSelected = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['role', 'password', 'createdAt', 'updatedAt'],
      },
    })

    //check if user exist
    if (!userSelected)
      return res.status(404).send({
        status: 'Error',
        message: "User doesn't exist",
      })

    await User.destroy({
      where: {
        id,
      },
    })

    res.send({
      status: 'Success',
      message: 'Success to delete user',
      data: {
        id,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.changePassword = async (req, res) => {
  try {
    const loggedUser = req.userId.id
    const { id } = req.params
    const { body } = req

    const schema = joi.object({
      prevPassword: joi.string().required(),
      newPassword: joi.string().min(8).max(50).required(),
    })

    const { error } = schema.validate(body)
    if (error) {
      return res.status(403).send({
        status: 'Error',
        message: error.details[0].message,
      })
    }

    //get user
    const getUser = await User.findOne({
      where: {
        id,
      },
    })

    if (!getUser) {
      return res.status(404).send({
        status: 'Not Found',
        message: "User doesn't exists",
      })
    }

    //check if the logged user is an authorized user and role is mahasiswa
    if (getUser.id !== loggedUser && loggedUser != 1) {
      return res.status(403).send({
        status: 'Unauthorized',
        message: 'You are forbidden to do edit',
      })
    }

    //check if the previous password same with database password before updated
    const comparedPassword = await bcrypt.compare(
      body.prevPassword,
      getUser.password,
    )

    if (!comparedPassword) {
      return res.status(401).send({
        status: 'Failed',
        message: 'Wrong password',
      })
    }

    const newPassword = await bcrypt.hash(body.newPassword, 10)

    await User.update(
      {
        password: newPassword,
      },
      {
        where: {
          id,
        },
      },
    )

    res.send({
      status: 'Success',
      message: 'Success to change password',
      data: {
        id,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

//admin section
exports.adminUpdateProfile = async (req, res) => {
  try {
    const loggedUser = req.userId.id
    const { body } = req

    const schema = joi.object({
      email: joi.string().email().min(11).max(50).required(),
    })

    const { error } = schema.validate(body)
    if (error) {
      return res.status(403).send({
        status: 'Error',
        message: error.details[0].message,
      })
    }

    //get user
    const getUser = await User.findOne({
      where: {
        id: loggedUser,
      },
    })

    if (!getUser) {
      return res.status(404).send({
        status: 'Not Found',
        message: "User doesn't exists",
      })
    }

    //check if the logged user is an authorized user and role is admin
    if (getUser.id !== loggedUser && getUser.role !== 'admin') {
      return res.status(403).send({
        status: 'Unauthorized',
        message: 'You are forbidden to do edit',
      })
    }

    await User.update(body, {
      where: {
        id: loggedUser,
      },
    })

    res.send({
      status: 'Success',
      message: 'Success to update',
      data: {
        id: loggedUser,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

//mahasiswa data action
exports.mahasiswaRegister = async (req, res) => {
  try {
    const { body } = req

    const schema = joi.object({
      email: joi.string().email().min(11).max(50).required(),
      password: joi.string().min(8).max(50).required(),
      name: joi.string().min(6).max(50).required(),
      nim: joi.string().min(9).max(15).required(),
    })

    const { error } = schema.validate(body)
    if (error) {
      return res.status(403).send({
        status: 'Error',
        message: error.details[0].message,
      })
    }

    //check if any same email in database
    const getUsers = await User.findAll({
      where: {
        role: 'mahasiswa',
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })

    const checkEmail = getUsers.filter((user) => user.email === body.email)

    if (checkEmail.length > 0) {
      return res.status(417).send({
        status: 'Failed',
        message: 'Email has been registered',
      })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const createUserMahasiswa = await User.create({
      email: body.email,
      password: hashedPassword,
      role: 'mahasiswa',
    })

    await Profile.create({
      userId: createUserMahasiswa.id,
      name: body.name,
      nim: body.nim,
      nidn: '',
    })

    const token = jwt.sign(
      {
        id: createUserMahasiswa.id,
      },
      process.env.SECRET_KEY,
    )

    res.status(201).send({
      status: 'Success',
      message: 'Berhasil Mendaftar',
      data: {
        user: {
          id: createUserMahasiswa.id,
          email: createUserMahasiswa.email,
          role: createUserMahasiswa.role,
          token,
        },
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.getMahasiswaUsers = async (req, res) => {
  try {
    const userLogged = req.userId.id

    //check if the user is admin
    const getAdmin = await User.findOne({
      where: {
        id: userLogged,
      },
    })

    if (getAdmin.role !== 'admin') {
      return res.status(403).send({
        status: 'Forbidden',
        message: 'You are forbidden to use this route',
      })
    }

    const allMahasiswa = await User.findAll({
      where: {
        role: 'mahasiswa',
      },
      attributes: {
        exclude: ['password'],
      },
      order: [['createdAt', 'DESC']],
    })

    const mahasiswa = []

    for (let i = 0; i < allMahasiswa.length; i++) {
      const findProfile = await Profile.findOne({
        where: {
          userId: allMahasiswa[i].id,
        },
        attributes: {
          exclude: ['nidn', 'createdAt', 'updatedAt'],
        },
      })

      mahasiswa.push({
        id: allMahasiswa[i].id,
        email: allMahasiswa[i].email,
        role: allMahasiswa[i].role,
        name: findProfile.name,
        nim: findProfile.nim,
      })
    }

    res.send({
      status: 'Success',
      message: 'Success to get all mahasiswa user',
      data: {
        mahasiswa,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.updateMahasiswa = async (req, res) => {
  try {
    const { id } = req.params
    const loggedUser = req.userId.id
    const { body } = req

    const schema = joi.object({
      email: joi.string().email().min(11).max(50).required(),
      name: joi.string().min(5).max(50).required(),
      nim: joi.string().min(8).max(50).required(),
    })

    const { error } = schema.validate(body)
    if (error) {
      return res.status(403).send({
        status: 'Error',
        message: error.details[0].message,
      })
    }

    //get user
    const getUser = await User.findOne({
      where: {
        id,
      },
    })

    //check if user exist
    if (!getUser) {
      return res.status(404).send({
        status: 'Not Found',
        message: "User doesn't exists",
      })
    }

    //check if the logged user is an authorized user and role is mahasiswa
    if (getUser.id !== loggedUser && loggedUser != 1) {
      return res.status(403).send({
        status: 'Unauthorized',
        message: 'You are forbidden to do edit',
      })
    }

    await User.update(body, {
      where: {
        id,
      },
    })

    await Profile.update(body, {
      where: {
        userId: id,
      },
    })

    res.send({
      status: 'success',
      message: 'Update User Success',
      data: {
        id,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.getMahasiswaById = async (req, res) => {
  try {
    const { id } = req.params

    //get user
    const getUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })

    if (!getUser) {
      return res.status(404).send({
        status: 'Not Found',
        message: "User doesn't exists",
      })
    }

    const profile = await Profile.findOne({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    res.send({
      status: 'Success',
      message: 'Success to get mahasiswa user',
      data: {
        mahasiswa: {
          id: getUser.id,
          email: getUser.email,
          role: getUser.role,
          name: profile.name,
          nim: profile.nim,
        },
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

//staff or lecturer
exports.staffRegister = async (req, res) => {
  try {
    const { body } = req
    const userLogged = req.userId.id

    const schema = joi.object({
      email: joi.string().email().min(11).max(50).required(),
      password: joi.string().min(8).max(50).required(),
      role: joi.string().required(),
      name: joi.string().min(6).max(50).required(),
      nidn: joi.string().min(9).max(15).required(),
    })

    const { error } = schema.validate(body)
    if (error) {
      return res.status(403).send({
        status: 'Error',
        message: error.details[0].message,
      })
    }

    //check if the user is admin
    const getAdmin = await User.findOne({
      where: {
        id: userLogged,
      },
    })

    if (getAdmin.role !== 'admin') {
      return res.status(403).send({
        status: 'Forbidden',
        message: 'You are forbidden to use this route',
      })
    }

    //check if any same email in database
    const getUsers = await User.findAll({
      where: {
        role: body.role,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })

    const checkEmail = getUsers.filter((user) => user.email === body.email)

    if (checkEmail.length > 0) {
      return res.status(417).send({
        status: 'Failed',
        message: 'Email has been registered',
      })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const createUserMahasiswa = await User.create({
      email: body.email,
      password: hashedPassword,
      role: body.role,
    })

    await Profile.create({
      userId: createUserMahasiswa.id,
      name: body.name,
      nim: '',
      nidn: body.nidn,
    })

    res.status(201).send({
      status: 'Success',
      message: 'Berhasil Mendaftar',
      data: {
        user: {
          email: createUserMahasiswa.email,
          role: createUserMahasiswa.role,
        },
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params
    const userLogged = req.userId.id

    //get user
    const getUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password'],
      },
    })

    //check user validation
    if (!getUser) {
      return res.status(404).send({
        status: 'Not Found',
        message: "User doesn't exists",
      })
    }

    //check if the logged user is an authorized user and role is admin
    if (getUser.id !== userLogged && userLogged != 1) {
      return res.status(403).send({
        status: 'Unauthorized',
        message: 'You are forbidden to do edit',
      })
    }

    //get user profile
    const profile = await Profile.findOne({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    if (!profile) {
      return res.send({
        status: 'Success',
        message: 'Success to get data user staff',
        data: {
          staff: {
            id: getUser.id,
            email: getUser.email,
          },
        },
      })
    }

    res.send({
      status: 'Success',
      message: 'Success to get data user staff',
      data: {
        staff: {
          id: getUser.id,
          email: getUser.email,
          role: getUser.role,
          name: profile.name,
          nidn: profile.nidn,
        },
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.getAllStaffByRole = async (req, res) => {
  try {
    const { role } = req.params
    const staff = await User.findAll({
      where: {
        role,
      },
      attributes: {
        exclude: ['password', 'updatedAt'],
      },
      order: [['createdAt', 'DESC']],
    })

    if (staff.length === 0) {
      return res.send({
        status: 'Success',
        message: 'Success to get data',
        data: {
          staff,
        },
      })
    }

    let staffProfile = []

    for (let i = 0; i < staff.length; i++) {
      const profile = await Profile.findOne({
        where: {
          userId: staff[i].id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      })

      staffProfile.push({
        id: staff[i].id,
        email: staff[i].email,
        role: staff[i].role,
        name: profile.name,
        nidn: profile.nidn,
      })
    }

    res.send({
      status: 'Success',
      message: 'Success to get data',
      data: {
        staff: staffProfile,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.updateStaffProfile = async (req, res) => {
  try {
    const { id } = req.params
    const loggedUser = req.userId.id
    const { body } = req

    let schema = null

    if (loggedUser == 1) {
      schema = joi.object({
        email: joi.string().email().min(11).max(50).required(),
        name: joi.string().min(5).max(50).required(),
        role: joi.allow(),
        nidn: joi.string().min(8).max(50).required(),
      })
    } else {
      schema = joi.object({
        email: joi.string().email().min(11).max(50).required(),
        name: joi.string().min(5).max(50).required(),
        nidn: joi.string().min(8).max(50).required(),
      })
    }

    const { error } = schema.validate(body)
    if (error) {
      return res.status(403).send({
        status: 'Error',
        message: error.details[0].message,
      })
    }

    //get user
    const getUser = await User.findOne({
      where: {
        id,
      },
    })

    //check if user exist
    if (!getUser) {
      return res.status(404).send({
        status: 'Not Found',
        message: "User doesn't exists",
      })
    }

    //check if the logged user is an authorized user and role is mahasiswa
    if (getUser.id !== loggedUser && loggedUser != 1) {
      return res.status(403).send({
        status: 'Unauthorized',
        message: 'You are forbidden to do edit',
      })
    }

    await User.update(body, {
      where: {
        id,
      },
    })

    await Profile.update(body, {
      where: {
        userId: id,
      },
    })

    res.send({
      status: 'success',
      message: 'Update User Success',
      data: {
        id,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.getDospem = async (req, res) => {
  try {
    //mencari dosen pembimbing dengan kurang dari 10 judul yang mendapat acc
    const dospem = await User.findAll({
      where: {
        role: 'dospem',
      },
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: Profile,
      },
    })

    if (dospem.length === 0) {
      return res.send({
        message: 'Dosen pembimbing belum ditambahkan',
        data: dospem,
      })
    }

    let dospemWithJudul = []

    for (let i = 0; i < dospem.length; i++) {
      const judul = await Judul.findAll({
        where: {
          dospemId: dospem[i].id,
        },
        include: {
          model: DetailJudul,
          where: {
            dospemStatus: 'acc',
          },
        },
      })

      dospemWithJudul.push({
        ...dospem[i].dataValues,
        judul,
      })
    }

    const filteredDospem = dospemWithJudul.filter(
      (dospem) => dospem.judul.length <= 10,
    )

    res.send({
      data: {
        dospem: filteredDospem,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}
