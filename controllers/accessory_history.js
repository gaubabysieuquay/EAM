const sequelize = require("sequelize");
const db = require("../models");
const Accessory_history = db.Accessory_history;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Accessory_history.findAll({
    include: [
      {
        model: db.Supplier,
      },
      {
        model: db.Location,
      },
      {
        model: db.Accessory,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error Some error occurred while retrieving the History.",
      });
    });
};

exports.findOne = (req, res) => {
  const accessoryId = req.params.accessoryId;
  Accessory_history.findAll({
    where: { accessoryId: accessoryId },
    include: [
      {
        model: db.Supplier,
      },
      {
        model: db.Location,
      },
      {
        model: db.Accessory,
      },
    ],
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

exports.delete = (req, res) => {
  const id = req.params.id;

  Accessory_history.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "History was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete History with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete History with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Accessory_history.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Histories were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all histories.",
      });
    });
};

//Find all objects by condition
exports.findAllByName = (req, res) => {
  Accessory_history.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
