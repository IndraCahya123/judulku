const { User, Comment, DetailJudul, Profile, Judul } = require("../../models");

const joi = require("joi");

exports.getMyJudul = async (req, res) => {
  try {
    const userLogged = req.userId.id;

    //get all judul
    const getAllJudul = await Judul.findAll({
      where: {
        userId: userLogged,
      },
      order: [["createdAt", "DESC"]],
    });

    if (getAllJudul.length === 0) {
      return res.send({
        data: {
          judul: getAllJudul,
        },
      });
    }

    //check user logged
    const getUser = await User.findOne({
      where: {
        id: getAllJudul[0].userId,
      },
    });

    if (userLogged !== getUser.id) {
      return res.status(403).send({
        message: "Forbidden activities",
      });
    }

    //get judul detail
    let judulDetails = [];

    for (let i = 0; i < getAllJudul.length; i++) {
      const detail = await DetailJudul.findOne({
        where: {
          judulId: getAllJudul[i].id,
        },
      });

      const dospem = await User.findOne({
        where: {
          id: getAllJudul[i].dospemId,
        },
        attributes: {
          exclude: ["password"],
        },
        include: {
          model: Profile,
        },
      });

      judulDetails.push({
        ...getAllJudul[i].dataValues,
        judulUrl: process.env.file_url + getAllJudul[i].judul,
        dospem,
        detail,
      });
    }

    const judul = [];

    for (let x = 0; x < getAllJudul.length; x++) {
      const comment = await Comment.findAll({
        where: {
          judulId: getAllJudul[x].id,
        },
        include: {
          model: User,
          include: {
            model: Profile,
          },
        },
        order: [["updatedAt", "DESC"]],
      });

      judul.push({
        ...judulDetails[x],
        comments: comment,
      });
    }

    res.send({
      data: {
        judul,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.addJudul = async (req, res) => {
  try {
    const userId = req.userId.id;
    const { body } = req;

    const schema = joi.object({
      userId: joi.required(),
      pdf: joi.allow(),
      dospemId: joi.required(),
    });

    const { error } = schema.validate(body);

    if (error)
      return res.status(400).send({
        status: "There's error in your data input",
        message: error.details[0].message,
      });

    //cek jika sudah ada dosen pembimbing yang ditambahkan
    const getDospem = await User.findAll({
      where: {
        role: "dospem",
      },
    });

    if (getDospem.length === 0) {
      return res.status(403).send({
        message:
          "Belum bisa menambahkan judul karena belum ada Dosen Pembimbing yang ditambahkan",
      });
    }

    const judul = await Judul.create({
      userId,
      judul: req.files.pdf[0].filename,
      dospemId: body.dospemId,
    });

    //create judul detail
    await DetailJudul.create({
      judulId: judul.id,
    });

    res.send({
      message: "Success to upload file",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.deleteJudul = async (req, res) => {
  try {
    const judulId = req.params.id;
    const userLogged = req.userId.id;

    const getJudul = await Judul.findOne({
      where: {
        id: judulId,
      },
    });

    //check user
    if (getJudul.userId != userLogged) {
      return res.status(403).send({
        message: "Forbidden activity",
      });
    }

    //check if judul exists
    if (!getJudul) {
      return res.status(404).send({
        message: "Judul not found",
      });
    }

    await Judul.destroy({
      where: {
        id: judulId,
      },
    });

    res.send({
      message: "Success to delete judul",
      id: judulId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.updateJudulByMhs = async (req, res) => {
  try {
    const userLogged = req.userId.id;
    const judulId = req.params.id;
    const body = req.body;

    const judul = await Judul.findOne({
      where: {
        id: judulId,
      },
    });

    if (!judul) {
      return res.status(404).send({
        message: "Judul not found",
      });
    }

    //check user
    if (judul.userId != userLogged) {
      return res.status(403).send({
        message: "Forbidden activity",
      });
    }

    let newFile;

    if (req.files.pdf === undefined) {
      newFile = judul.judul;
    } else {
      newFile = req.files.pdf[0].filename;
    }

    const updatedData = {
      judul: newFile,
      dospemId: body.dospemId,
    };

    await Judul.update(updatedData, {
      where: {
        id: judulId,
      },
    });

    res.send({
      message: "Success to update judul",
      id: judulId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.dospemGetJudul = async (req, res) => {
  try {
    const userLogged = req.userId.id;

    //get all judul
    const getAllJudul = await Judul.findAll({
      where: {
        dospemId: userLogged,
      },
      order: [["updatedAt", "DESC"]],
    });

    if (getAllJudul.length === 0) {
      return res.send({
        data: {
          judul: getAllJudul,
        },
      });
    }

    //check user logged
    const getUser = await User.findOne({
      where: {
        id: getAllJudul[0].dospemId,
      },
    });

    if (userLogged !== getUser.id) {
      return res.status(403).send({
        message: "Forbidden activities",
      });
    }

    //get judul detail
    let judulDetails = [];

    for (let i = 0; i < getAllJudul.length; i++) {
      const detail = await DetailJudul.findOne({
        where: {
          judulId: getAllJudul[i].id,
        },
      });

      const mahasiswa = await User.findOne({
        where: {
          id: getAllJudul[i].userId,
        },
        attributes: {
          exclude: ["password"],
        },
        include: {
          model: Profile,
        },
      });

      judulDetails.push({
        ...getAllJudul[i].dataValues,
        judulUrl: process.env.file_url + getAllJudul[i].judul,
        mahasiswa,
        detail,
      });
    }

    const judul = [];

    for (let x = 0; x < getAllJudul.length; x++) {
      const comment = await Comment.findAll({
        where: {
          judulId: getAllJudul[x].id,
        },
        include: {
          model: User,
          include: {
            model: Profile,
          },
        },
        order: [["updatedAt", "DESC"]],
      });

      judul.push({
        ...judulDetails[x],
        comments: comment,
      });
    }

    res.send({
      data: {
        judul,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.updateJudulByDospem = async (req, res) => {
  try {
    const userLogged = req.userId.id;
    const { judulId } = req.params;
    const { body } = req;

    const judul = await Judul.findOne({
      where: {
        id: judulId,
      },
      include: [
        {
          model: DetailJudul,
        },
        {
          model: Comment,
        },
      ],
    });

    if (!judul) {
      return res.status(404).send({
        message: "Judul not found",
      });
    }

    if (judul.dospemId != userLogged) {
      return res.status(403).send({
        message: "Forbidden activity",
      });
    }

    let schema;
    if (body.comment == "") {
      schema = joi.object({
        dospemResponse: joi.required(),
        comment: joi.allow(),
      });
    } else {
      schema = joi.object({
        dospemResponse: joi.required(),
        comment: joi.string().min(10).required(),
      });
    }

    const { error } = schema.validate(body);

    if (error)
      return res.status(400).send({
        status: "There's error in your data input",
        message: error.details[0].message,
      });

    if (body.comment == "") {
      await DetailJudul.update(
        {
          dospemStatus: body.dospemResponse,
        },
        {
          where: {
            id: judul.DetailJudul.id,
          },
        }
      );
    } else {
      await DetailJudul.update(
        {
          dospemStatus: body.dospemResponse,
        },
        {
          where: {
            id: judul.DetailJudul.id,
          },
        }
      );

      await Comment.create({
        judulId,
        userId: userLogged,
        message: body.comment,
      });
    }

    res.send({
      message: "Berhasil diupdate",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.kaprodiGetJudul = async (req, res) => {
  try {
    const userLogged = req.userId.id;

    const userKaprodi = await User.findOne({
      where: {
        id: userLogged,
      },
    });

    if (userKaprodi.role !== "kaprodi") {
      return res.status(403).send({
        message: "Forbidden activity",
      });
    }

    //search judul
    const getJudul = await Judul.findAll({
      include: {
        model: DetailJudul,
      },
      order: [["updatedAt", "DESC"]],
    });

    if (getJudul.length == 0) {
      return res.send({
        data: {
          judul: getJudul,
        },
      });
    }

    let allDataJudul = [];

    for (let i = 0; i < getJudul.length; i++) {
      const mahasiswa = await User.findOne({
        where: {
          id: getJudul[i].userId,
        },
        include: {
          model: Profile,
        },
        attributes: {
          exclude: ["password"],
        },
      });

      const dospem = await User.findOne({
        where: {
          id: getJudul[i].dospemId,
        },
        include: [
          {
            model: Profile,
          },
          {
            model: Comment,
            order: [["updatedAt", "DESC"]],
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });

      allDataJudul.push({
        ...getJudul[i].dataValues,
        mahasiswa,
        dospem,
      });
    }

    const judulNoValue = allDataJudul.filter((judul) => {
      return (
        judul.DetailJudul.dospemStatus == "diterima" &&
        judul.DetailJudul.value == null
      );
    });

    const judulWithValue = allDataJudul.filter((judul) => {
      return (
        judul.DetailJudul.dospemStatus == "diterima" &&
        judul.DetailJudul.value != null &&
        judul.DetailJudul.score == null
      );
    });

    const judulWithScore = allDataJudul.filter((judul) => {
      return (
        judul.DetailJudul.dospemStatus == "diterima" &&
        judul.DetailJudul.value != null &&
        judul.DetailJudul.score != null
      );
    });

    res.send({
      message: "Success get data",
      data: {
        judul: {
          judulNoValue,
          judulWithValue,
          judulWithScore,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.kaprodiSetValue = async (req, res) => {
  try {
    const userLogged = req.userId.id;
    const { judulId } = req.params;
    const { body } = req;

    const user = await User.findOne({
      where: {
        id: userLogged,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (user.role !== "kaprodi") {
      return res.status(403).send({
        message: "Forbidden activity",
      });
    }

    await DetailJudul.update(
      {
        value: body.value
      }, 
      {
      where: {
        judulId,
      },
    });

    res.send({
      message: "Judul diupdate",
      data: {
        id: judulId,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};
