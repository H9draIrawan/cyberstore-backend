import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import user from "../models/user.model.js";

const register = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({
				message: "All form required",
			});
		}

		const userExist = await user.findOne({
			$or: [{ username }, { email }],
		});

		if (userExist) {
			return res.status(409).json({
				message: "User already exists",
			});
		}

		user.create({
			username: username,
			email: email,
			password: bcrypt.hashSync(password, 8),
		});

		return res.status(201).json({
			message: "User registration success",
		});
	} catch (error) {
		console.log(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return res.status(500).json({ message });
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: "All form required",
			});
		}

		const userExist = await user.findOne({
			email: email,
		});

		if (!userExist) {
			return res.status(404).json({
				message: "User don't exists",
			});
		}

		const isPassword = bcrypt.compareSync(password, userExist.password);

		if (!isPassword) {
			return res.status(409).json({
				message: "Password incorrect",
			});
		}

		return res.status(200).json({
			message: "User login success",
		});
	} catch (error) {
		console.log(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return res.status(500).json({ message });
	}
};
const logout = async (req: Request, res: Response) => {};
const profile = async (req: Request, res: Response) => {};
const activation = async (req: Request, res: Response) => {};
const resendToken = async (req: Request, res: Response) => {};
const forgotPassword = async (req: Request, res: Response) => {};
const changePassword = async (req: Request, res: Response) => {};
const rememberMe = async (req: Request, res: Response) => {};

export {
	login,
	register,
	logout,
	profile,
	activation,
	resendToken,
	forgotPassword,
	changePassword,
	rememberMe,
};
