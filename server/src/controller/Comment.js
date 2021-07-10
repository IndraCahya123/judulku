const { User, Comment, DetailJudul, Profile, Judul } = require('../../models')

const joi = require('joi')

exports.addComment = async (req, res) => {
  try {
    const { judulId } = req.params
    const userId = req.userId.id
    const { body } = req

    const schema = joi.object({
      message: joi.string().min(10).required(),
    })

    const { error } = schema.validate(body)

    if (error)
      return res.status(400).send({
        status: "There's error in your data input",
        message: error.details[0].message,
      })

    await Comment.create({
      judulId,
      userId,
      message: body.message,
    })

    res.status(201).send({
      message: 'Comment has been added',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.updateComment = async (req, res) => {
  try {
    const userLogged = req.userId.id
    const {commentId} = req.params
    const {body} = req

    const getComment = await Comment.findOne({
      where: {
        id: commentId
      }
    });

    if (!getComment) {
      return res.status(404).send({
        message: "Comment not found"
      })
    }

    if (getComment.userId != userLogged) {
      return res.status(403).send({
        message: "Forbidden activity"
      })
    }

    const updatedData = await Comment.update({
      message: body.comment
    },
    {
      where:{
        id: commentId
      }
    })

    res.send({
      message: "Berhasil edit komentar",
      data: {
        id: commentId,
        update: updatedData
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const userLogged = req.userId.id
    const {commentId} = req.params 

    const getComment = await Comment.findOne({
      where: {
        id: commentId
      }
    });

    if (!getComment) {
      return res.status(404).send({
        message: "Comment not found"
      })
    }

    if (getComment.userId != userLogged) {
      return res.status(403).send({
        message: "Forbidden activity"
      })
    }

    await Comment.destroy({
      where: {
        id: commentId
      }
    })

    res.send({
      message: "Berhasil hapus komentar",
      data: {
        id: commentId,
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'error',
      message: 'Server Error',
    })
  }
}
