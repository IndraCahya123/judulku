//models
const { Criteria, User } = require('../../models')

//library
const joi = require('joi')

exports.addCriteria = async (req, res) => {
  try {
    const userLogged = req.userId.id
    const { body } = req

    const schema = joi.object({
      name: joi.string().min(6).max(50).required(),
      value: joi.number().min(1).max(5).required(),
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

    await Criteria.create({
      name: body.name,
      value: body.value,
    })

    res.status(201).send({
      status: 'Success',
      message: 'Success to create criteria',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.getAllCriteria = async (req, res) => {
  try {
    const criteria = await Criteria.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    res.send({
      status: 'Success',
      message: 'Success to get all criteria',
      data: {
        criteria,
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

exports.getCriteriaById = async (req, res) => {
  try {
    const { id } = req.params

    const criteria = await Criteria.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    if (!criteria)
      return res.status(404).send({
        status: 'Error',
        message: "Criteria doesn't exist",
      })

    res.send({
      status: 'Success',
      message: 'Success to get criteria',
      data: {
        criteria,
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

exports.deleteCriteria = async (req, res) => {
  try {
    const { id } = req.params
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

    //check if criteria exists
    const criteria = await Criteria.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    if (!criteria)
      return res.status(404).send({
        status: 'Error',
        message: "Criteria doesn't exist",
      })

    await Criteria.destroy({
      where: {
        id,
      },
    })

    res.send({
      status: 'Success',
      message: 'Success to delete criteria',
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

exports.updateCriteria = async (req, res) => {
  try {
    const { id } = req.params
    const userLogged = req.userId.id
    const { body } = req

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

    //check if criteria exists
    const criteria = await Criteria.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    if (!criteria)
      return res.status(404).send({
        status: 'Error',
        message: "Criteria doesn't exist",
      })

    await Criteria.update(body, {
      where: {
        id,
      },
    })

    res.send({
      status: 'Success',
      message: 'Success to update criteria',
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
