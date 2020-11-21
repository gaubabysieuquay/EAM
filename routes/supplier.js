module.exports = (app) => {
  const suppliers = require("../controllers/supplier");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.post("/", suppliers.create);

  router.get("/", suppliers.findAll);

  router.get("/:id", suppliers.findOne);

  router.get("/name", suppliers.findAllByName);

  router.put("/:id", suppliers.update);

  router.delete("/:id", suppliers.delete);

  router.delete("/", suppliers.deleteAll);

  app.use("/suppliers", router);
};
