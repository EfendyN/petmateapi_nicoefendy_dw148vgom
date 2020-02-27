const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ where: { id: data.user_id } });
    if (!user) {
      throw new Error();
    }
    req.user = user.id;
    req.roles = user.user_rules;
    console.log(user);
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
