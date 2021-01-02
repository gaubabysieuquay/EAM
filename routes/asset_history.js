module.exports = (app) => {
    const asset_histories = require("../controllers/asset_history");
    const cors = require("cors");
    const router = require("express").Router();
    router.use(cors());
  
    router.get("/", asset_histories.findAll);
  
    router.get("/:id", asset_histories.findOne);
  
    router.get("/name", asset_histories.findAllByName);
  
    router.delete("/:id", asset_histories.delete);
  
    router.delete("/", asset_histories.deleteAll);
  
    app.use("/asset_histories", router);
  };
  