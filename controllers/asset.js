const db = require("../models");
const Asset = db.Asset;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const today = new Date();
  const assetData = {
    barcode: req.body.barcode,
    name: req.body.name,
    serial: req.body.serial,
    model: req.body.model,
    purchaseDate: req.body.purchaseDate,
    purchaseCost: req.body.purchaseCost,
    warranty: req.body.warranty,
    note: req.body.note,
    image: req.body.image,
    status: req.body.status,
    supplierId: req.body.supplierId,
    createdAt: today,
  };

  Asset.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((asset) => {
      if (!asset) {
        Asset.create(assetData)
          .then((asset) => {
            res.send({ message: asset.name + " Added" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      }
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occurred while creating the Asset.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Asset.findAll({ where: condition, include: db.Supplier })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error Some error occurred while retrieving the Asset.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Asset.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Asset with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Asset.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Asset was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Asset with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Asset with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Asset.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Asset was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Asset with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Asset with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Asset.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Assets were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all assets.",
      });
    });
};

//Find all objects by condition
exports.findAllByName = (req, res) => {
  Asset.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};

//Get the assets for the given supplier
exports.getSupplier = (req, res) => {
  const supplierId = req.params.supplierId;
  Asset.findAll({
    where: { supplierId: supplierId },
    attributes: ["name"],
    include: [
      {
        model: db.Supplier,
        attributes: ["id", "name"],
        as: "supplier",
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
  Asset.findAll({ include: db.Supplier })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
