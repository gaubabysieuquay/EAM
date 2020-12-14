module.exports = (app) => {
  const roles = require("../controllers/role");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.get("/", roles.findAll);

  router.get("/:id", roles.findOne);

  router.get("/name", roles.findAllByName);

  router.put("/:id", roles.update);

  router.delete("/:id", roles.delete);

  router.delete("/", roles.deleteAll);

  app.use("/roles", router);
};
