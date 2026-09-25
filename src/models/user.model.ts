import { randomUUID } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: randomUUID,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: [String],
		default: ["buyer"],
		// buyer, seller, admin
	},
	money: {
		type: Number,
		default: 0,
	},
	status: {
		type: String,
		default: "pending",
		//pending, active, suspended
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updateAt: {
		type: Date,
		default: Date.now(),
	},
});

const user = mongoose.model("user", userSchema);
export { user };
