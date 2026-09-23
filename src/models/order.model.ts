import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { productSchema } from "./product.model.js";

const orderSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: randomUUID,
	},
	name: {
		type: String,
		required: true,
	},
	total: {
		type: Number,
		required: true,
		min: 0,
	},
	status: {
		type: String,
		default: "pending",
		// pending, cancel, success
	},
	products: [productSchema],
	fk_users_buyer_orders_id: {
		type: mongoose.Schema.Types.String,
		ref: "users",
	},
	fk_users_seller_orders_id: {
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

const order = mongoose.model("order", orderSchema);
export { order };
