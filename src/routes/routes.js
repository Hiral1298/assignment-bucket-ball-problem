let controller = require("../controllers/controller");
let router = require("express").Router();
let { validateBody } = require("../middleware/validators/validator");
module.exports = (app) => {
  router.post("/get-suggetions", validateBody, controller.getSuggetions);
  router.get("/", validateBody, controller.viewSuggetions).post("/get-suggetions-view", validateBody, controller.viewSuggetionsPost);
  app.use("/", router);
};
