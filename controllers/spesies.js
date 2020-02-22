const models = require("../models");
const Spesies = models.spesies;

exports.SpesiesIndex = async (req, res) => {
  try {
    const spesies = await Spesies.findAll();
    res.send(spesies);
  } catch (err) {
    console.log(err);
  }
};

exports.SpesiesAdd = async (req, res) => {
  try {
    const { name } = req.body;
    const check = await Spesies.findOne({
      where: { name }
    });
    if (check) {
      res.status(401).send({
        status: false,
        message: "The spesies name is ready to use"
      });
    } else {
      //console.log(req.user);
      const spesies = await Spesies.create(req.body);
      res.status(200).send({
        status: true,
        message: "Success add new species name",
        data: spesies
      });
    }
  } catch (err) {
    console.log(err);
  }
};
