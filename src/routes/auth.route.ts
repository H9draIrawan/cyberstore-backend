import express from "express";
import {
	activationUser,
	changePassword,
	forgotPassword,
	login,
	logout,
	refresh,
	register,
	resendToken,
	userNow,
} from "../controllers/auth.controller.js";

const route = express.Router();

route.get("/user", userNow);
route.post("/login", login);
route.post("/register", register);
route.post("/logout", logout);
route.post("/refresh", refresh);
route.post("/activation-user", activationUser);
route.post("/forgot-password", forgotPassword);
route.post("/change-password", changePassword);
route.post("/resend-token", resendToken);

export default route;
