const { body } = require("express-validator");

exports.validateBody = [
  body("buckets")
    .exists()
    .withMessage("Please Enter Buckets")
    .isArray()
    .withMessage("Please enter data in array"),
  body("balls")
    .exists()
    .withMessage("Please enter balls")
    .isArray()
    .withMessage("Please enter data in array"),
];
