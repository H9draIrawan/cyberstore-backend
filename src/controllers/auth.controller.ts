import { type Request, type Response } from "express";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({
				message: "All form required",
			});
		}

		const hash = bcrypt.hashSync(password, 8);

		return res.status(201).json({
			message: "User registration success",
		});
	} catch (err: unknown) {
		console.log(err);

		const message =
			err instanceof Error ? err.message : "Internal server error";
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

		// const isPassword = await bcrypt.compare(password, password)

		return res.status(200).json({
			message: "User login success",
		});
	} catch (err: unknown) {
		console.log(err);

		const message =
			err instanceof Error ? err.message : "Internal server error";
		return res.status(500).json({ message });
	}
};

export { login, register };
