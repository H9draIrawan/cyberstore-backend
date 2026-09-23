import express from "express";
import {
	deleteUserById,
	getAllUsers,
	getUserById,
	restoreUserById,
	setUserStatusById,
	updateRolesById,
	updateUserById,
    updateUsersStatus,
} from "../controllers/user.controller.js";

const route = express.Router();

route.get("/", getAllUsers); // get all users
route.get("/:id", getUserById); // get user by Id
route.patch("/:id", updateUserById); // update user by Id
route.delete("/:id", deleteUserById); // delete user by Id (soft delete / hard delete)
route.post("/:id/restore", restoreUserById); // restore user deleted by soft delete
route.patch("/:id/status", setUserStatusById); // set status user by Id
route.patch("/:id/roles", updateRolesById); // update roles user by Id
route.patch("/status", updateUsersStatus);

export default route;
