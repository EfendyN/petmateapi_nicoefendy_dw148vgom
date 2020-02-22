"use strict";
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      nama: DataTypes.STRING,
      gender: DataTypes.STRING,
      spesies: DataTypes.STRING,
      age: DataTypes.STRING,
      user: DataTypes.STRING,
      about_pet: DataTypes.STRING,
      photo: DataTypes.STRING
    },
    {}
  );
  pet.associate = function(models) {
    pet.belongsTo(models.user, {
      foreignKey: "user",
      as: "breeder"
    });
    pet.belongsTo(models.spesies, {
      foreignKey: "spesies",
      as: "category"
    });
    pet.belongsTo(models.age, {
      foreignKey: "age",
      as: "ages"
    });
  };
  return pet;
};
