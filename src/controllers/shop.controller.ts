import { type Request, type Response } from "express";
import { shop } from "../models/shop.model.js";
import { user } from "../models/user.model.js";

const getAllShop = async (_req: Request, _res: Response) => {
	try {
		const shops = await shop.find().populate({
			path: "fk_users_shops_id",
			model: user,
			select: "username email",
		});

		return _res.status(200).json(shops);
	} catch (error) {
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const createShop = async (_req: Request, _res: Response) => {
	try {
		const { name, user_id } = _req.body;

		await shop.create({
			name: name,
			fk_users_shops_id: user_id,
		});

		return _res.status(201).json({ message: "Shop created successfully" });
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const updateShop = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const { name, status } = _req.body;

		const shopById = await shop.findByIdAndUpdate(id, {
			name: name,
			status: status,
			updateAt: Date.now(),
		});

		if (!shopById) {
			return _res.status(404).json({ message: "Shop not found" });
		}

		return _res.status(200).json({ message: "Shop updated successfully" });
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const deleteShop = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const isDeleted = _req.query.force;

		if (isDeleted) {
			const deletedShop = await shop.findByIdAndDelete(id);
			if (!deletedShop) {
				return _res.status(404).json({ message: "Shop not found" });
			}

			return _res
				.status(200)
				.send({ message: "Shop hard delete successfully" });
		}

		const deletedShop = await shop.findByIdAndUpdate(id, {
			status: false,
			updateAt: Date.now(),
		});
		if (!deletedShop) {
			return _res.status(404).json({ message: "Shop not found" });
		}

		return _res.status(200).send({ message: "Shop soft delete successfully" });
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

export { getAllShop, createShop, updateShop, deleteShop };
