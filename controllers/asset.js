const sequelize = require("sequelize");
const db = require("../models");
const Asset = db.Asset;
const Asset_history = db.Asset_history;
const History = db.History;
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
    expireDate: req.body.expireDate,
    note: req.body.note,
    image: req.body.image,
    status: req.body.status,
    supplierId: req.body.supplierId,
    locationId: req.body.locationId,
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
  var condition = { status: { [Op.not]: 4 } };

  Asset.findAll({
    where: condition,
    include: [{ model: db.Supplier }, { model: db.Location }],
  })
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
  Asset.findOne({
    where: { id: id },
    include: [
      {
        model: db.Supplier,
      },
      {
        model: db.Location,
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

//Find all expire day
exports.findAllByExpire = (req, res) => {
  Asset.update(
    { status: 2 },
    {
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("date", sequelize.col("expireDate")),
            "<=",
            sequelize.fn(
              "date",
              sequelize.fn(
                "date_add",
                sequelize.fn("now"),
                sequelize.literal(`INTERVAL 10 DAY`)
              )
            )
          ),
          sequelize.where(
            sequelize.fn("date", sequelize.fn("now")),
            ">",
            sequelize.fn("date", sequelize.col("expireDate"))
          ),
        ],
      },
    }
  );
  Asset.update(
    { status: 3 },
    {
      where: sequelize.where(
        sequelize.fn("date", sequelize.fn("now")),
        ">",
        sequelize.fn("date", sequelize.col("expireDate"))
      ),
    }
  );
  Asset.findAll({
    where: {
      [Op.and]: [
        sequelize.where(
          sequelize.fn("date", sequelize.col("expireDate")),
          "<=",
          sequelize.fn(
            "date",
            sequelize.fn(
              "date_add",
              sequelize.fn("now"),
              sequelize.literal(`INTERVAL 10 DAY`)
            )
          )
        ),
        sequelize.where(
          sequelize.fn("date", sequelize.fn("now")),
          ">",
          sequelize.fn("date", sequelize.col("expireDate"))
        ),
      ],
    },
  })
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

//Find all broken asset
exports.findAllBrokenAsset = (req, res) => {
  Asset.findAll({
    where: {
      status: 3,
    },
  })
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

//Get the assets with createdAt closest to today
exports.findAllByCreate = (req, res) => {
  Asset.findAll({
    where: { createdAt: { [Op.lt]: sequelize.fn("now") } },
    order: [["createdAt", "DESC"]],
    limit: 5,
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

exports.findAllArchive = (req, res) => {
  var condition = { status: 4 };

  Asset.findAll({
    where: condition,
    include: [{ model: db.Supplier }, { model: db.Location }],
  })
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
  Asset.findAll({ include: [{ model: db.Supplier }, { model: db.Location }] })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
};
