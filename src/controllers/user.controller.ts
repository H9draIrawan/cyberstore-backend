import { type Request, type Response } from "express";
import { user } from "../models/user.model.js";

const getAllUsers = async (_req: Request, _res: Response) => {
	try {
		const users = await user.find();
		return _res.status(200).json({
			message: "Users retrieved successfully",
			users: users,
		});
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const getUserById = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const userById = await user.findById(id);
		if (!userById) {
			return _res.status(404).json({ message: "User not found" });
		}

		return _res.status(200).json({
			message: "User retrieved successfully",
			user: userById,
		});
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const updateUser = async (_req: Request, _res: Response) => {};
const deleteUser = async (_req: Request, _res: Response) => {};
const restoreUser = async (_req: Request, _res: Response) => {};

export { getAllUsers, getUserById };
