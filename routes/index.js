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

// middleware
const { auth } = require("../middleware/auth");

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
router.get("/pets", IndexPet);
router.post("/pets", auth, AddPet);
router.put("/pets/:id", PetUpdate);
router.delete("/pets/:id", PetDestroy);
router.get("/pets/:id", PetDetails);

module.exports = router;
