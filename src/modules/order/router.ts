import { Request, Router } from 'express'
import { FindBeerSqlRepository } from '../beer/infra/repository/sql/find-beer'
import { prismaClient } from '../core/database/sql/prisma-client'
import { CreateOrderHandlerImpl } from './application/command/create-order'
import { CreateOrderSqlRepository } from './infra/repository/sql/create-order'
import { CreateOrderControllerImpl } from './presentation/controller/create-order'

export const orderRouter = Router()
orderRouter.post('/', (req: Request, res) => {
	const handler = new CreateOrderHandlerImpl(
		new CreateOrderSqlRepository(prismaClient),
		new FindBeerSqlRepository(prismaClient),
	)

	const controller = new CreateOrderControllerImpl(handler)

	controller
		.execute({
			body: req.body,
			query: undefined,
			params: undefined,
		})
		.then((result) => {
			res.status(result.statusCode).json({
				...result,
				statusCode: undefined,
			})
		})
		.catch((error) => {
			res.status(500).send({
				error: error.message,
			})
		})
})
