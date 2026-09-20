import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import user from "../models/user.model.js";

function createCookies() {}

const register = async (_req: Request, _res: Response) => {
	try {
		const { username, email, password } = _req.body;
		if (!username || !email || !password) {
			return _res.status(400).json({
				message: "All form required",
			});
		}

		const userExist = await user.findOne({
			$or: [{ username }, { email }],
		});

		if (userExist) {
			return _res.status(409).json({
				message: "User already exists",
			});
		}

		user.create({
			username: username,
			email: email,
			password: bcrypt.hashSync(password, 10),
		});

		return _res.status(201).json({
			message: "User registration success",
		});
	} catch (error) {
		console.log(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return _res.status(500).json({ message });
	}
};

const login = async (_req: Request, _res: Response) => {
	try {
		const { email, password, isRememberMe } = _req.body;

		if (!email || !password) {
			return _res.status(400).json({
				message: "All form required",
			});
		}

		const userExist = await user.findOne({
			email: email,
		});

		if (!userExist) {
			return _res.status(404).json({
				message: "User don't exists",
			});
		}

		const isPassword = bcrypt.compareSync(password, userExist.password);

		if (!isPassword) {
			return _res.status(409).json({
				message: "Password incorrect",
			});
		}

		if (isRememberMe) {
		}

		return _res.status(200).json({
			message: "User login success",
		});
	} catch (error) {
		console.log(error);

		const message =
			error instanceof Error ? error.message : "Internal server error";
		return _res.status(500).json({ message });
	}
};

const logout = async (_req: Request, _res: Response) => {};

const refresh = async (_req: Request, _res: Response) => {};

const activationUser = async (_req: Request, _res: Response) => {};

const resendToken = async (_req: Request, _res: Response) => {};

const forgotPassword = async (_req: Request, _res: Response) => {};

const changePassword = async (_req: Request, _res: Response) => {};

export {
	login,
	register,
	logout,
	refresh,
	activationUser,
	resendToken,
	forgotPassword,
	changePassword,
};
