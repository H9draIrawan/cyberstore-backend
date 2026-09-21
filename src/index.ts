import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import route from "./routes/route.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
		exposedHeaders: ["Set-Cookie"],
	}),
);
app.use("/api/v1", route);

app.listen(port, () => {
	mongoose.connect("mongodb://localhost:27017/cyberstore").then(() => {
		console.log("MongoDB connected");
		console.log("[Server] : Server is running at http://localhost:", port);
	});
});
