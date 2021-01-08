module.exports = (app) => {
  const manufacturers = require("../controllers/manufacturer");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.post("/", manufacturers.create);

  router.get("/", manufacturers.findAll);

  router.get("/:id", manufacturers.findOne);

  router.get("/name", manufacturers.findAllByName);

  router.put("/:id", manufacturers.update);

  router.delete("/:id", manufacturers.delete);

  router.delete("/", manufacturers.deleteAll);

  app.use("/manufacturers", router);
};
