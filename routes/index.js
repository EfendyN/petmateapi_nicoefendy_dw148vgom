const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth");
// const models = require("../models");
const { register } = require("../controllers/register");
const { SpesiesAdd, SpesiesIndex } = require("../controllers/spesies");
const {
  IndexPet,
  AddPet,
  PetUpdate,
  PetDestroy,
  PetDetails
} = require("../controllers/pet");

router.get("/", (req, res) => {
  res.send("<strong>Hello DumbWays Rumah Tengah cuy</strong>");
});

// auth
router.post("/login", login);
router.post("/register", register);

// spesies
router.post("/spesies", SpesiesAdd);
router.get("/spesies", SpesiesIndex);

// pet
router.get("/pet", IndexPet);
router.post("/pet", AddPet);
router.put("/pet", PetUpdate);
router.delete("/pet", PetDestroy);
router.get("/pet", PetDetails);

module.exports = router;
