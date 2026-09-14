import express from "express";
import { getAll, getByEmail } from "../controllers/user.controller.js";

const route = express.Router();

route.get("/all", getAll);
route.get("/email/:email", getByEmail);

export default route;
