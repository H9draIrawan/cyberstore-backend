import express from "express";
import {
	deleteUser,
	getAllUsers,
	getUser,
	restoreUser,
	updateUser,
	updateUserMoney,
	updateUserPassword,
	updateUserRoles,
	updateUserStatus,
} from "../controllers/user.controller.js";

const route = express.Router();

route.get("/", getAllUsers); // get all users
route.get("/:id", getUser); // get user by Id

route.patch("/:id", updateUser); // update user by Id
route.patch("/:id/password", updateUserPassword); // update user by Id
route.patch("/:id/status", updateUserStatus); // set status user by Id
route.patch("/:id/roles", updateUserRoles); // update roles user by Id
route.patch("/:id/money", updateUserMoney); // update money user by Id
route.patch("/:id/restore", restoreUser); // restore user deleted by soft delete

route.delete("/:id", deleteUser); // delete user by Id (soft delete / hard delete)

export default route;
