import { randomUUID } from "crypto";
import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: randomUUID,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	fk_users_shops_id: {
		type: mongoose.Schema.Types.String,
		ref: "users",
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

const shop = mongoose.model("shop", shopSchema);
export { shop };
