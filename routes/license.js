module.exports = (app) => {
  const licenses = require("../controllers/license");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.post("/", licenses.create);

  router.get("/", licenses.findAll);

  router.get("/:id", licenses.findOne);

  router.get("/name", licenses.findAllByName);

  router.put("/:id", licenses.update);

  router.delete("/:id", licenses.delete);

  router.delete("/", licenses.deleteAll);

  app.use("/licenses", router);
};
