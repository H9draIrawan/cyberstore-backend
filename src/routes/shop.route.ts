import express from "express";
import {
	createShop,
	deleteShop,
	getAllShop,
	updateShop,
} from "../controllers/shop.controller.js";

const route = express.Router();

route.get("/", getAllShop);
route.post("/", createShop);
route.patch("/:id", updateShop);
route.delete("/:id", deleteShop);

export default route;
