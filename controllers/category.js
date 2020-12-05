const db = require("../models");
const Category = db.Category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const today = new Date();
  const categoryData = {
    name: req.body.name,
    createdAt: today,
  };

  Category.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((category) => {
      if (!category) {
        Category.create(categoryData)
          .then((category) => {
            res.send({ message: category.name + " Added" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      }
    })
    .catch((err) => {
      res.send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Category.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error Some error occurred while retrieving the Category.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Category with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Category was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Category with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Categories were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories.",
      });
    });
};

//Find all objects by condition
exports.findAllByName = (req, res) => {
  Category.findAll({ where: req.body.name })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};

