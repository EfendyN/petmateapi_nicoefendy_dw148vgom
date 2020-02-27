const models = require("../models");
const petModel = models.pet;
const UserModel = models.user;
const SpesiesModel = models.spesies;
const AgeModel = models.age;

exports.IndexPet = async (req, res) => {
  try {
    const pet = await petModel.findAll({
      include: [
        {
          model: UserModel,
          as: "breeder",
          attributes: ["id", "breeder", "phone", "address"]
        },
        {
          model: SpesiesModel,
          as: "category",
          attributes: ["id", "name"]
        },
        {
          model: AgeModel,
          as: "ages",
          attributes: ["id", "name"]
        }
      ],
      attributes: { exclude: ["user", "spesies", "age"] }
    });
    res.send(pet);
  } catch (err) {
    console.log(err);
  }
};

exports.AddPet = async (req, res) => {
  const { name, gender, about_pet, photo } = req.body;
  const spesies = req.body.spesies.id;
  const age = req.body.age.id;
  const user = req.body.user.id;

  try {
    const pet = await petModel.create({
      nama: name,
      gender,
      spesies,
      age,
      user,
      about_pet,
      photo
    });
    const id = pet.id;
    const data = await petModel.findOne({
      include: [
        {
          model: UserModel,
          as: "breeder",
          attributes: ["id", "breeder", "phone", "address"]
        },
        {
          model: SpesiesModel,
          as: "category",
          attributes: ["id", "name"]
        },
        {
          model: AgeModel,
          as: "ages",
          attributes: ["id", "name"]
        }
      ],
      attributes: { exclude: ["user", "spesies", "age"] },
      where: { id }
    });
    res.status(200).send({
      status: true,
      message: "Success add new pet",
      data: data
    });
  } catch (err) {
    console.log(err);
  }
};

exports.PetUpdate = async (req, res) => {
  try {
    const id_data = req.params.id;
    const { nama, gender, age, about_pet, photo } = req.body;
    const spesies = req.body.spesies.id;
    // const user = req.body.user.id;

    console.log(`aaaaa ${id_data}`);
    const pet = await petModel.update(
      {
        nama,
        gender,
        spesies,
        age,
        about_pet,
        photo
      },
      { where: { id: id_data } }
    );

    const data = await petModel.findOne({
      include: [
        {
          model: UserModel,
          as: "breeder",
          attributes: ["id", "breeder", "phone", "address"]
        },
        {
          model: SpesiesModel,
          as: "category",
          attributes: ["id", "name"]
        },
        {
          model: AgeModel,
          as: "ages",
          attributes: ["id", "name"]
        }
      ],
      attributes: { exclude: ["user", "spesies", "age"] },
      where: { id: id_data }
    });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

exports.PetDestroy = async (req, res) => {
  const id_data = req.params.id;
  try {
    const pet = await petModel.findOne({
      include: [
        {
          model: UserModel,
          as: "breeder",
          attributes: ["id", "breeder", "phone", "address"]
        },
        {
          model: SpesiesModel,
          as: "category",
          attributes: ["id", "name"]
        },
        {
          model: AgeModel,
          as: "ages",
          attributes: ["id", "name"]
        }
      ],
      attributes: { exclude: ["user", "spesies", "age"] },
      where: { id: id_data }
    });
    const petdelete = await petModel.destroy({ where: { id: id_data } });
    res.send({ message: "delete success", pet });
  } catch (err) {
    console.log(err);
  }
};

exports.PetDetails = async (req, res) => {
  const id_data = req.params.id;
  try {
    const pet = await petModel.findOne({
      include: [
        {
          model: UserModel,
          as: "breeder",
          attributes: ["id", "breeder", "phone", "address"]
        },
        {
          model: SpesiesModel,
          as: "category",
          attributes: ["id", "name"]
        },
        {
          model: AgeModel,
          as: "category",
          attributes: ["id", "name"]
        }
      ],
      attributes: { exclude: ["user", "spesies", "age"] },
      where: { id: id_data }
    });
    res.send({ message: "detail success", pet });
  } catch (err) {
    console.log(err);
  }
};
