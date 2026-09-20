import { type CookieOptions, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import "dotenv/config";

function createCookies(userId: string, isRememberMe: boolean) {
	const token = jwt.sign(userId, process.env.JWT_SECRET!, {
		expiresIn: "3m",
	});

	const cookieOptions: CookieOptions = {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: isRememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined,
	};

	return { token, cookieOptions };
}

const register = async (_req: Request, _res: Response) => {
	try {
		const { username, email, password } = _req.body;
		if (!username || !email || !password) {
			return _res.status(400).json({
				message: "All form required",
			});
		}

		const userExist = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (userExist) {
			return _res.status(409).json({
				message: "User already exists",
			});
		}

		User.create({
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

		const userExist = await User.findOne({
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

		const { token, cookieOptions } = createCookies(userExist.id, isRememberMe);

		_res.cookie("x-auth-token", token, cookieOptions);

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

const logout = async (_req: Request, _res: Response) => {
	try {
		_res.clearCookie("x-auth-token");
		return _res.status(200).json({
			message: "Logout successful",
		});
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Internal server error";
		if (error instanceof Error) {
			return _res.status(500).json({ message: message });
		}
	}
};

const refresh = async (_req: Request, _res: Response) => {
	try {
		const auth = _req.cookies["x-auth-token"];

		if (!auth) {
			return _res.status(401).json({
				message: "Unauthorized",
			});
		}

		const userId = jwt.verify(auth, process.env.JWT_SECRET!);

		return _res.status(200).json({
			message: "Authorized",
			userId: userId,
		});
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Internal server error";
		if (error instanceof Error) {
			return _res.status(500).json({ message: message });
		}
	}
};

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
