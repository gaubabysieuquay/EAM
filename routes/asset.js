module.exports = (app) => {
  const assets = require("../controllers/asset");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.post("/", assets.create);

  router.get("/", assets.findAll);

  router.get("/:id", assets.findOne);

  router.get("/name", assets.findAllByName);

  router.put("/:id", assets.update);

  router.delete("/:id", assets.delete);

  router.delete("/", assets.deleteAll);

  app.use("/assets", router);
};
