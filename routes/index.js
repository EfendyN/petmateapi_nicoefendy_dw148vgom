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

const {
  IndexUser,
  UserUpdate,
  UserDestroy,
  UserDetail
} = require("../controllers/user");

// middleware
const { auth } = require("../middleware/auth");

//home
router.get("/", (req, res) => {
  res.send("<strong>Hello DumbWays Rumah Tengah cuy</strong>");
});

// auth
router.post("/login", login);
router.post("/register", register);

// spesies
router.post("/spesies", auth, SpesiesAdd);
router.get("/spesies", auth, SpesiesIndex);

// pet
router.get("/pets", auth, IndexPet);
router.post("/pets", auth, AddPet);
router.put("/pets/:id", auth, PetUpdate);
router.delete("/pets/:id", auth, PetDestroy);
router.get("/pets/:id", auth, PetDetails);

// user
router.get("/users", auth, IndexUser);
router.put("/users/:id", auth, UserUpdate);
router.delete("/users/:id", auth, UserDestroy);
router.get("/users/:id", auth, UserDetail);

module.exports = router;
