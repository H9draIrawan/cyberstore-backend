import express from "express";
import auth from "./auth.route.js";
import user from "./user.route.js";

const route = express.Router();

route.use("/auth", auth);
route.use("/users", user);

export default route;
