const sequelize = require("sequelize");
const db = require("../models");
const License = db.License;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const today = new Date();
  const licenseData = {
    name: req.body.name,
    productKey: req.body.productKey,
    purchaseDate: req.body.purchaseDate,
    purchaseCost: req.body.purchaseCost,
    expireDate: req.body.expireDate,
    note: req.body.note,
    image: req.body.image,
    supplierId: req.body.supplierId,
    manufacturerId: req.body.manufacturerId,
    createdAt: today,
  };

  License.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((license) => {
      if (!license) {
        License.create(licenseData)
          .then((license) => {
            res.send({ message: license.name + " Added" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      }
    })
    .catch((err) => {
      res.send({
        message:
          err.message || "Some error occurred while creating the License.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  License.findAll({
    where: condition,
    include: [{ model: db.Supplier }, { model: db.Manufacturer }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error Some error occurred while retrieving the License.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  License.findOne({
    where: { id: id },
    include: [
      {
        model: db.Supplier,
      },
      {
        model: db.Manufacturer,
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

exports.update = (req, res) => {
  const id = req.params.id;

  License.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "License was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update License with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating License with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  License.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "License was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete License with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete License with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  License.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Licenses were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Licenses.",
      });
    });
};

//Find all objects by condition
exports.findAllByName = (req, res) => {
  License.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};

