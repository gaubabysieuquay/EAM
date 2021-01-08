const sequelize = require("sequelize");
const db = require("../models");
const Asset_history = db.Asset_history;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Asset_history.findAll({
    include: [
      {
        model: db.Supplier,
      },
      {
        model: db.Location,
      },
      {
        model: db.Asset,
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
  const assetId = req.params.assetId;
  Asset_history.findAll({
    where: { assetId: assetId },
    include: [
      {
        model: db.Supplier,
      },
      {
        model: db.Location,
      },
      {
        model: db.Asset,
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

  Asset_history.destroy({
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
  Asset_history.destroy({
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
  Asset_history.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
