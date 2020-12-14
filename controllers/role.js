const db = require("../models");
const config = require("../config/auth.js");
const Role = db.Role;

//Operator
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Role.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error Some error occurred while retrieving the Role.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Role.findOne({
    where: { id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Role.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Role.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Role was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Role with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Role.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Roles were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Roles.",
      });
    });
};

exports.findAllByName = (req, res) => {
  Role.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
