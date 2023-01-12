const {
  createUser,
  login,
  GetAllUsers,
  GetUserbyId,
  DeleteUserbyId,
  UpdateUser,
} = require("../controllers/userCtrl");
const express = require("express");
const Router = express.Router();

Router.post("/register", createUser);
Router.post("/login", login);
Router.get("/get-users", GetAllUsers);
Router.get("/:id", GetUserbyId);
Router.delete("/:id", DeleteUserbyId);
Router.put("/:id", UpdateUser);

module.exports = Router;
