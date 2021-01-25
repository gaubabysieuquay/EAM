module.exports = (app) => {
  const license_histories = require("../controllers/license_history");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.get("/", license_histories.findAll);

  router.get("/:licenseId", license_histories.findOne);

  router.get("/name", license_histories.findAllByName);

  router.delete("/:id", license_histories.delete);

  router.delete("/", license_histories.deleteAll);

  app.use("/license_histories", router);
};
