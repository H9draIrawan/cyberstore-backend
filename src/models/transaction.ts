import { randomUUID } from "crypto";
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: randomUUID,
		unique: true,
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
	fk_orders_transactions_id: {
		type: mongoose.Schema.Types.String,
		ref: "users",
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

const transaction = mongoose.model("transaction", transactionSchema);
export { transaction };
