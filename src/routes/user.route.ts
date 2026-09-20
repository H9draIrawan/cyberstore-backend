import express from "express";
import {
	deleteUser,
	getAll,
	getById,
	restoreUser,
	updateUser,
} from "../controllers/user.controller.js";

const route = express.Router();

route.get("/", getAll);
route.get("/:id", getById);

// route.patch(":/id", updateUser);
// route.delete("/:id", deleteUser);
// route.post("/:id/restore", restoreUser);

export default route;
