const models = require("../models");
const petModel = models.pet;
const UserModel = models.user;
const SpesiesModel = models.spesies;

exports.IndexPet = async (req, res) => {
  try {
    const spesies = await petModel.findAll({
      include: [
        {
          model: UserModel,
          as: "breeder",
          attributes: ["id", "breeder", "phone", "address"]
        },
        {
          model: SpesiesModel,
          as: "category",
          attributes: ["id", "nama"]
        }
      ],
      attributes: { exclude: ["user", "spesies"] }
    });
    res.send(spesies);
  } catch (err) {
    console.log(err);
  }
};

exports.AddPet = async (req, res) => {
  const { name, gender, age, about_pet, photo } = req.body;
  const spesies = req.body.spesies.id;
  const user = req.body.user.id;
  console.log("aaaaaaaaaaaaaaaaaaaa" + req.body.name);

  try {
    //console.log(req.user);
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
          attributes: ["id", "nama"]
        }
      ],
      attributes: { exclude: ["user", "spesies"] },
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
  const id_data = req.params.id;
  const { nama, gender, age, about_pet, photo } = req.body;
  const spesies = req.body.spesies.id;
  const user = req.body.user.id;

  try {
    const pet = await petModel.update(
      {
        nama,
        gender,
        spesies,
        age,
        user,
        about_pet,
        photo
      },
      { where: { id: id_data } }
    );

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
          attributes: ["id", "nama"]
        }
      ],
      attributes: { exclude: ["user", "spesies"] },
      where: { id }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.PetDestroy = async (req, res) => {
  const id = req.params;
  try {
    const pet = await PetModel.findOne({
      include: [
        {
          model: UserModel,
          as: "breeder",
          attributes: ["id", "breeder", "phone", "address"]
        },
        {
          model: SpesiesModel,
          as: "category",
          attributes: ["id", "nama"]
        }
      ],
      attributes: { exclude: ["user", "spesies"] },
      where: { id }
    });
    res.send(pet);
  } catch (err) {
    console.log(err);
  }
};

exports.PetDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await PetModel.findOne({
      include: [
        {
          model: UserModel,
          as: "breeder",
          attributes: ["id", "breeder", "phone", "address"]
        },
        {
          model: SpesiesModel,
          as: "category",
          attributes: ["id", "nama"]
        }
      ],
      attributes: { exclude: ["user", "spesies"] },
      where: { id }
    });
    res.send(pet);
  } catch (err) {
    console.log(err);
  }
};
