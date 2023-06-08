import { NextFunction, Request, Response } from "express";

import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

export async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { id } = request.user;

	const usersRepository = new UsersRepository();

	const user = await usersRepository.findById(id);

	if (!user.is_admin) {
		throw new AppError("You're not authorized to perform this action", 401) ;
	}

	return next();
}
