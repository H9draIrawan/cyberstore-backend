import { type Request, type Response } from "express";
import { order } from "../models/order.model.js";

const getAllOrders = (_req: Request, _res: Response) => {
	try {
		const orders = order.find();
		return _res.status(200).json({
			message: "Users retrieved successfully",
			orders: orders,
		});
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const getOrderById = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const orderById = await order.findById(id);
		if (!orderById) {
			return _res.status(404).json({ message: "User not found" });
		}

		return _res.status(200).json({
			message: "User retrieved successfully",
			order: orderById,
		});
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

export { getAllOrders as getAllOrder, getOrderById };
