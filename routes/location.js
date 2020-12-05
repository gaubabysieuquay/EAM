module.exports = (app) => {
  const locations = require("../controllers/location");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.post("/", locations.create);

  router.get("/", locations.findAll);

  router.get("/:id", locations.findOne);

  router.get("/name", locations.findAllByName);

  router.put("/:id", locations.update);

  router.delete("/:id", locations.delete);

  router.delete("/", locations.deleteAll);

  app.use("/locations", router);
};
