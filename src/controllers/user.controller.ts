import { type Request, type Response } from "express";
import User from "../models/user.model.js";

const getAll = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		return res.status(200).json({
			users: users,
		});
	} catch (error) {
		console.log(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return res.status(500).json({ message });
	}
};

const getById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userById = await User.findById(id);
		return res.status(200).json({
			user: userById,
		});
	} catch (error) {
		console.log(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return res.status(500).json({ message });
	}
};

const getByEmail = async (req: Request<{email : string}>, res: Response) => {
	try {
		const { email} = req.params;
		const userByEmail = await User.findOne({ email: email });
		return res.status(200).json({
			user: userByEmail,
		});
	} catch (error) {
		console.log(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return res.status(500).json({ message });
	}
}

const getByUsername = async(req : Request<{username : string}>, res : Response) => {
	try {
		const {username} = req.params;
		const userByUsername = await User.findOne({username:username });
		return res.status(200).json({
			user: userByUsername,
		});
	} catch (error) {
		console.log(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return res.status(500).json({ message });
	}

}

export { getAll, getById, getByEmail, getByUsername };
