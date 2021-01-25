const sequelize = require("sequelize");
const db = require("../models");
const Accessory = db.Accessory;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const today = new Date();
  const accessoryData = {
    name: req.body.name,
    model: req.body.model,
    purchaseDate: req.body.purchaseDate,
    purchaseCost: req.body.purchaseCost,
    quantity: req.body.quantity,
    availableQTY: req.body.quantity,
    note: req.body.note,
    image: req.body.image,
    manufacturerId: req.body.manufacturerId,
    supplierId: req.body.supplierId,
    locationId: req.body.locationId,
    createdAt: today,
  };

  Accessory.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((accessory) => {
      if (!accessory) {
        Accessory.create(accessoryData)
          .then((accessory) => {
            res.send({ message: accessory.name + " Added" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      }
    })
    .catch((err) => {
      res.send({
        message:
          err.message || "Some error occurred while creating the Accessory.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Accessory.findAll({
    where: condition,
    include: [
      {
        model: db.Supplier,
      },
      {
        model: db.Location,
      },
      {
        model: db.Manufacturer,
      },
      {
        model: db.User,
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
          "Some error Some error occurred while retrieving the Accessory.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Accessory.findOne({
    where: { id: id },
    include: [
      {
        model: db.Supplier,
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

  Accessory.update(req.body, {
    where: { id: id },
    individualHooks: true,
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accessory was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Accessory with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Accessory with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Accessory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Accessory was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Accessory with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Accessory with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Accessory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Accessories were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Accessories.",
      });
    });
};

//Find all objects by condition
exports.findAllByName = (req, res) => {
  Accessory.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};

//Get the accessories for the given supplier
exports.getSupplier = (req, res) => {
  const supplierId = req.params.supplierId;
  Accessory.findAll({
    where: { supplierId: supplierId },
    attributes: ["name"],
    include: [
      {
        model: db.Supplier,
        attributes: ["id", "name"],
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

exports.getSupplierAll = (req, res) => {
  Accessory.findAll({
    include: [{ model: db.Supplier }, { model: db.Location }],
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
