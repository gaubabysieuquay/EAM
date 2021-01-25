//Authentication
module.exports = (app) => {
  const { verifySignUp } = require("../middlewares");
  const controller = require("../controllers/auth");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  router.post("/", controller.signup, [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted]);

  router.get("/", controller.findAll);

  router.get("/:id", controller.findOne);

  router.get("/username", controller.findAllByName);

  router.put("/:id", controller.update);

  router.put("/user/:id", controller.verifyUser);

  router.delete("/:id", controller.delete);

  router.delete("/", controller.deleteAll);

  app.use("/users", router);
};
