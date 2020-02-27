const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;
const Pet = models.pet;

exports.register = async (req, res) => {
  try {
    const { email, password, breeder, phone, address, pet } = req.body;
    const { name, gender } = pet;
    const spesies = pet.spesies.id;
    const age = pet.age.id;

    const check = await User.findOne({ where: { email } });
    if (check) {
      res
        .status(401)
        .send({ status: false, message: "The Email Already Exists" });
    } else {
      const regUser = await User.create({
        email,
        user_rules: "user",
        password,
        breeder,
        phone,
        address
      });

      //   console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaa ${regUser.id}`);
      const regPet = await Pet.create({
        nama: name,
        gender,
        spesies,
        age,
        user: regUser.id
      });

      if (regUser && regPet) {
        const token = jwt.sign({ user_id: regUser.id }, process.env.SECRET_KEY);
        res
          .status(200)
          .send({ email, token, status: true, message: "Register Success" });
      } else {
        res.status(401).send({ status: false, message: "Invalid Register" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
