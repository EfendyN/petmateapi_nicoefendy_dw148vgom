const models = require("../models");
const jwt = require("jsonwebtoken");
const Payment = models.payment;
const User = models.user;

exports.AddPayment = async (req, res) => {
  const { no_rek, proof_of_transfer, status } = req.body;

  const token = req.header("Authorization").replace("Bearer ", "");
  const user = jwt.verify(token, process.env.SECRET_KEY);

  try {
    const payment = await Payment.create({
      no_rek,
      proof_of_transfer,
      user: user.user_id,
      status,
      createAt: new Date(),
      updateAt: new Date()
    });

    res.status(200).send({
      status: true,
      message: "Success to Created Payment",
      data: payment
    });
  } catch (err) {
    console.log(err);
  }
};

exports.UpdatePayment = async (req, res) => {
  const id = req.params.id;
  const { no_rek, proof_of_transfer, status } = req.body;

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, process.env.SECRET_KEY);
    // const level = await User.findOne({ where: { id: user.user_id } });

    console.log(req.roles);

    if (req.roles == "admin") {
      const payment = await Payment.update(req.body, { where: { id } });
      const payment_detail = await Payment.findOne({
        include: [
          {
            model: User,
            as: "us",
            attributes: [
              "id",
              "breeder",
              "address",
              "phone",
              "createdAt",
              "UpdatedAt"
            ]
          }
        ],
        attributes: { exclude: ["user"] },
        where: { id }
      });
      res.status(200).send({
        status: true,
        message: "Success to Updated Payment",
        data: payment_detail
      });
    } else {
      res.status(200).send({
        status: false,
        message: "Only Admin to Update payment"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
