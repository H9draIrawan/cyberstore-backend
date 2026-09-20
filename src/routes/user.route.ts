import express from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";

const route = express.Router();

route.get("/", getAllUsers);
route.get("/:id", getUserById);

// route.patch(":/id", updateUser);
// route.delete("/:id", deleteUser);
// route.post("/:id/restore", restoreUser);

export default route;
