const db = require("../models");
const Supplier = db.Supplier;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const today = new Date();
  const supplierData = {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    email: DataTypes.STRING,
    note: DataTypes.STRING,
    createdAt: today,
  };

  Supplier.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((supplier) => {
      if (!supplier) {
        supplier.create(supplierData)
          .then((supplier) => {
            res.send({ message: supplier.name + " Added" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      }
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occurred while creating the Supplier.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  supplier.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error Some error occurred while retrieving the Supplier.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Supplier.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Supplier with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Supplier.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Supplier was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Supplier with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Supplier with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Supplier.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Supplier was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Supplier with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
         message: err.message || "Could not delete Supplier with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Supplier.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Suppliers were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all suppliers.",
      });
    });
};

//Find all objects by condition
exports.findAllByName = (req, res) => {
  Supplier.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.",
      });
    });
};
