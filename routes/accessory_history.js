module.exports = (app) => {
    const accessory_histories = require("../controllers/accessory_history");
    const cors = require("cors");
    const router = require("express").Router();
    router.use(cors());
  
    router.get("/", accessory_histories.findAll);
  
    router.get("/:accessoryId", accessory_histories.findOne);
  
    router.get("/name", accessory_histories.findAllByName);
  
    router.delete("/:id", accessory_histories.delete);
  
    router.delete("/", accessory_histories.deleteAll);
  
    app.use("/accessory_histories", router);
  };
  