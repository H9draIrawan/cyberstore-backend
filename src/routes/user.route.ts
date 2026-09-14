import express from "express";
import { getAll } from "../controllers/user.controller.js";

const route = express.Router();

route.get("/all", getAll);

export default route;
