module.exports = (app) => {
  const accessories = require("../controllers/accessory");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.post("/", accessories.create);

  router.get("/", accessories.findAll);

  router.get("/:id", accessories.findOne);

  router.get("/name", accessories.findAllByName);

  router.get("/:supplierId/accessory", accessories.getSupplier);

  router.put("/:id", accessories.update);

  router.delete("/:id", accessories.delete);

  router.delete("/", accessories.deleteAll);

  app.use("/accessories", router);
};
