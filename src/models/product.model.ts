import { randomUUID } from "crypto";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: randomUUID,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	stocks: {
		type: Number,
		default: 1,
	},
	status: {
		type: Boolean,
		default: true,
	},
	fk_shops_products_id: {
		type: mongoose.Schema.Types.String,
		ref: "shops",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updateAt: {
		type: Date,
		default: Date.now,
	},
});

const product = mongoose.model("product", productSchema);
export { productSchema, product };
