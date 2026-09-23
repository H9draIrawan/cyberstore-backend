import express from "express";
import {
	deleteUserById,
	getAllUsers,
	getUserById,
	restoreUserById,
	updateUserStatusById,
	updateUserRolesById,
	updateUserById,
	updateUsersStatus,
	updateUserPasswordById,
	updateUserMoneyById,
} from "../controllers/user.controller.js";

const route = express.Router();

route.get("/", getAllUsers); // get all users
route.get("/:id", getUserById); // get user by Id

route.delete("/:id", deleteUserById); // delete user by Id (soft delete / hard delete)

route.patch("/:id", updateUserById); // update user by Id
route.patch("/:id/password", updateUserPasswordById); // update user by Id
route.patch("/:id/status", updateUserStatusById); // set status user by Id
route.patch("/:id/roles", updateUserRolesById); // update roles user by Id
route.patch("/:id/money", updateUserMoneyById); // update money user by Id
route.patch("/:id/restore", restoreUserById); // restore user deleted by soft delete

route.patch("/status", updateUsersStatus); // update status users

export default route;
