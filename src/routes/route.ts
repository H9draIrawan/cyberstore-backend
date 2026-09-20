import express from "express";
import auth from "./auth.route.js";
import user from "./user.route.js";
import shop from "./shop.route.js";

const route = express.Router();

route.use("/auth", auth);
route.use("/users", user);
route.use("/shops", shop);
// route.use("/products");
// route.use("/orders");
// route.use("/transactions");

export default route;
