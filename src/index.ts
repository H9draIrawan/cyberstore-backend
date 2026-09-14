import express from "express";
import cors from "cors";
import "dotenv/config";
import route from "./routes/route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	}),
);
app.use("/api", route);

app.listen(process.env.PORT, () => {
	console.log("Server running http://localhost:", process.env.PORT);
});
