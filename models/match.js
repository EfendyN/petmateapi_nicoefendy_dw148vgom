"use strict";
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define(
    "match",
    {
      pet_id: DataTypes.STRING,
      pet_id_liked: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  match.associate = function(models) {
    match.belongsTo(models.pet, {
      foreignKey: "pet_id",
      as: "pet"
    });
    match.belongsTo(models.pet, {
      foreignKey: "pet_id_liked",
      as: "pet_liked"
    });
  };
  return match;
};
