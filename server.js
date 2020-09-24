const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
//require("./app/routes/user.js")(app);
require("./routes/user")(app);
require("./routes/auth")(app);
require('./routes/asset')(app);



app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
