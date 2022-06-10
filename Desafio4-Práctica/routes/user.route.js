const express = require("express");

const userController = require("../controller/user.controller");

const router = express.Router();

//Llamo a los metodos creados en user.service y user.controller.
router.get("/", userController.GetAllProducts);
router.get("/:id", userController.GetUserById);
router.post("/", userController.CreateProduct);
router.put("/:id", userController.UpdateProductById);
router.delete("/:id", userController.DeletProductById);

module.exports = router;