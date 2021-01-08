const db = require("../models");
const Manufacturer = db.Manufacturer;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const today = new Date();
  const manufacturerData = {
    userId: req.body.userId,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zip: req.body.zip,
    note: req.body.note,
    createdAt: today,
  };

  Manufacturer.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((manufacturer) => {
      if (!manufacturer) {
        Manufacturer.create(manufacturerData)
          .then((manufacturer) => {
            res.send({ message: manufacturer.name + " Added" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      }
    })
    .catch((err) => {
      res.send({
        message:
          err.message || "Some error occurred while creating the Manufacturer.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Manufacturer.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error Some error occurred while retrieving the Manufacturer.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Manufacturer.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Manufacturer with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Manufacturer.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Manufacturer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Manufacturer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Manufacturer with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Manufacturer.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Manufacturer was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Manufacturer with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Manufacturer with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Manufacturer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Manufacturers were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Manufacturers.",
      });
    });
};

//Find all objects by condition
exports.findAllByName = (req, res) => {
  Manufacturer.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
