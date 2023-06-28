import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { appRouter } from "./routes";

import "../../../container";
import { AppDataSource } from "../../typeorm/data-source";
import { AppError } from "../../../errors/AppError";

AppDataSource.initialize().then(() => {
	console.log("Database connected successfully");
}).catch(err => console.log(err));

const app = express();

app.use(express.json());

app.use(appRouter);

app.use(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				message: err.message,
			});
		}

		return response.status(500).json({
			message: `Internal Server Error - ${err.message}`,
		});
	}
);

export { app };

