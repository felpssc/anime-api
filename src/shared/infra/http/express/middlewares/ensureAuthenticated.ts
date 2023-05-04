import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import auth from "../../../../../config/auth";

import { AppError } from "../../../../errors/AppError";

interface IPayload {
  user: {
		email: string
	},
	sub: string;
}

export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("JWT token is missing", 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub } = jwt.verify(token, auth.secret_token) as IPayload;

		request.user = {
			id: sub,
		};

		next();
	} catch (err) {
		throw new AppError("Invalid JWT token", 401);
	}
}
