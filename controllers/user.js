const models = require("../models");
const UserModel = models.user;

exports.IndexUser = async (req, res) => {
  try {
    const user = await UserModel.findAll({});
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};

exports.UserUpdate = async (req, res) => {
  try {
    const id_data = req.params.id;
    const { email, password, breeder, phone, address } = req.body;

    if (id_data == req.user) {
      const user = await UserModel.update(
        {
          email,
          password,
          breeder,
          phone,
          address
        },
        { where: { id: id_data } }
      );
      res.send({ message: "update data user success" });
    } else {
      res.status(401).send({ error: "You are not authorized." });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.UserDestroy = async (req, res) => {
  const id_data = req.params.id;
  try {
    const user = await UserModel.findAll({});
    const userdelete = await UserModel.destroy({ where: { id: id_data } });
    res.send({ message: "delete success", user: id_data });
  } catch (err) {
    console.log(err);
  }
};

exports.UserDetail = async (req, res) => {
  const id_data = req.params.id;
  try {
    const user = await UserModel.findAll({
      where: { id: id_data }
    });
    res.send({ message: "detail success", user });
  } catch (err) {
    console.log(err);
  }
};
