import { type Request, type Response } from "express";
import { user } from "../models/user.model.js";

const getAllUsers = async (_req: Request, _res: Response) => {
	try {
		const users = await user.find();
		return _res.status(200).json({
			message: "Users retrieved successfully",
			users: users.map((u) => ({
				username: u.username,
				email: u.email,
				status: u.status,
			})),
		});
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const getUser = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const userById = await user.findById(id);
		if (!userById) {
			return _res.status(404).json({ message: "User not found" });
		}

		return _res.status(200).json({
			message: "User retrieved successfully",
			user: {
				username: userById.username,
				email: userById.email,
				status: userById.status,
			},
		});
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const updateUser = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const { username, email } = _req.body;

		await user.findByIdAndUpdate(id, {
			username: username,
			email: email,
			updateAt: Date.now(),
		});

		return _res.status(200).json({ message: "User updated successfully" });
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const updateUserPassword = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const { password } = _req.body;

		await user.findByIdAndUpdate(id, {
			password: password,
			updateAt: Date.now(),
		});

		return _res
			.status(200)
			.json({ message: "User password updated successfully" });
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const updateUserMoney = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const { money } = _req.body;

		await user.findByIdAndUpdate(id, {
			money: money,
			updateAt: Date.now(),
		});

		return _res
			.status(200)
			.json({ message: "User money updated successfully" });
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const deleteUser = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const isDeleted = _req.query.force;

		if (isDeleted) {
			const deletedUser = await user.findByIdAndDelete(id);
			if (!deletedUser) {
				return _res.status(404).json({ message: "User not found" });
			}

			return _res
				.status(200)
				.send({ message: "User hard delete successfully" });
		}

		const deletedUser = await user.findByIdAndUpdate(id, {
			status: "deleted",
			updateAt: Date.now(),
		});
		if (!deletedUser) {
			return _res.status(404).json({ message: "User not found" });
		}

		return _res.status(200).send({ message: "User soft delete successfully" });
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const restoreUser = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;

		const restoreUser = await user.findByIdAndUpdate(id, {
			status: "active",
			updateAt: Date.now(),
		});

		if (!restoreUser) {
			return _res.status(404).json({ message: "User not found" });
		}

		return _res.status(200).send({ message: "User soft delete successfully" });
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const updateUserStatus = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const { status } = _req.body;

		if (!id || !status) {
			return _res
				.status(400)
				.json({ message: "User ID and status are required" });
		}

		const updatedUser = await user.findByIdAndUpdate(id, {
			status,
			updateAt: Date.now(),
		});

		if (!updatedUser) {
			return _res.status(404).json({ message: "User not found" });
		}

		return _res.status(200).json({
			message: "User status updated successfully",
		});
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

const updateUserRoles = async (_req: Request, _res: Response) => {
	try {
		const { id } = _req.params;
		const { roles } = _req.body;

		if (!id || !roles) {
			return _res
				.status(400)
				.json({ message: "User ID and roles are required" });
		}

		const updatedUser = await user.findByIdAndUpdate(id, {
			roles,
			updateAt: Date.now(),
		});

		if (!updatedUser) {
			return _res.status(404).json({ message: "User not found" });
		}

		return _res.status(200).json({
			message: "User roles updated successfully",
		});
	} catch (error) {
		console.error(error);
		return _res.status(500).json({ message: "Internal server error" });
	}
};

export {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	restoreUser,
	updateUserPassword,
	updateUserStatus,
	updateUserMoney,
	updateUserRoles,
};
