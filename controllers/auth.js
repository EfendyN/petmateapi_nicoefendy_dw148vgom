const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (user) {
      const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
      res.send({ email, token, status: true, message: "Login Success" });
    } else {
      res.status(401).send({ status: false, message: "Invalid login" });
    }
  } catch (err) {
    console.log(err);
  }
};
