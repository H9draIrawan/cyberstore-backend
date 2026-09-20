import { type Request, type Response } from "express";
import User from "../models/user.model.js";

const getAll = async (_req: Request, _res: Response) => {
	try {
		const users = await User.find();
		return _res.status(200).json({
			message: "Users retrieved successfully",
			users: users,
		});
	} catch (error) {
		console.error(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return _res.status(500).json({ message });
	}
};

const getById = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const userById = await User.findById(id);
		if (!userById) {
			return _res.status(404).json({ message: "User not found" });
		}

		return _res.status(200).json({
			message: "User retrieved successfully",
			user: userById,
		});
	} catch (error) {
		console.log(error);
		// const message =
		// 	error instanceof Error ? error.message : "Internal server error";
		return _res.status(500).json({ message: "Internal server error" });
	}
};

// const getByEmail = async (_req: Request<{ email: string }>, _res: Response) => {
// 	try {
// 		const { email } = _req.params;
// 		const userByEmail = await User.findOne({ email: email });
// 		return _res.status(200).json({
// 			user: userByEmail,
// 		});
// 	} catch (error) {
// 		console.log(error);

// 		const message =
// 			error instanceof Error ? error.message : "Internal server error";
// 		return _res.status(500).json({ message });
// 	}
// };

// const getByUsername = async (
// 	_req: Request<{ username: string }>,
// 	_res: Response,
// ) => {
// 	try {
// 		const { username } = _req.params;
// 		const userByUsername = await User.findOne({ username: username });
// 		return _res.status(200).json({
// 			user: userByUsername,
// 		});
// 	} catch (error) {
// 		console.log(error);

// 		const message =
// 			error instanceof Error ? error.message : "Internal server error";
// 		return _res.status(500).json({ message });
// 	}
// };

const updateUser = async (_req: Request, _res: Response) => {
	const { id } = _req.params;

	console.log(id);
};
const deleteUser = async (_req: Request, _res: Response) => {};
const restoreUser = async (_req: Request, _res: Response) => {};

export { getAll, getById, updateUser, deleteUser, restoreUser };
