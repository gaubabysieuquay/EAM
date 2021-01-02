const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
require("./routes/user")(app);
require("./routes/role")(app);
require("./routes/auth")(app);
require("./routes/asset")(app);
require("./routes/supplier")(app);
require("./routes/location")(app);
require("./routes/accessory")(app);
require("./routes/asset_history")(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
