const express = require("express");
const assets = express.Router();
const cors = require("cors");

const db = require("../models");
const Asset = db.Asset;

assets.use(cors());

assets.post("/add", (req, res) => {
  const today = new Date();
  const assetData = {
    barcode: req.body.barcode,
    name: req.body.name,
    serial: req.body.serial,
    model: req.body.model,
    unit: req.body.unit,
    origin: req.body.origin,
    purchaseCost: req.body.purchaseCost,
    warranty: req.body.warranty,
    note: req.body.note,
    image: req.body.image,
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
            res.json({ status: asset.name + " Added" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

assets.delete("/delete/:id", (req, res) => {
  Asset.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ status: "Deleted" });
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

assets.put("/update/:id", (req, res) => {
  const assetData = {
    barcode: req.body.barcode,
    name: req.body.name,
    serial: req.body.serial,
    model: req.body.model,
    unit: req.body.unit,
    origin: req.body.origin,
    purchaseCost: req.body.purchaseCost,
    warranty: req.body.warranty,
    note: req.body.note,
    image: req.body.image,
    createdAt: today,
  };
  Asset.update(assetData, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.json({ status: "Updated" });
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

assets.get("/display", (req, res) => {
  Asset.findAll()
    .then((asset) => {
      res.json(asset);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = assets;
