import 'module-alias/register'

import cors from 'cors'
import express, { Request } from 'express'
import { FindBeerHandlerImpl } from './modules/beer/application/query/find-beer'
import { ListBeerHandlerImpl } from './modules/beer/application/query/list-beer'
import { FindBeerSqlRepository } from './modules/beer/infra/repository/sql/find-beer'
import { FindBeerControllerImpl } from './modules/beer/presentation/controller/find-beer'
import { ListBeerControllerImpl } from './modules/beer/presentation/controller/list-beer'
import { BeerModel } from './modules/core/db/nosql/mongo-client'
import { prismaClient } from './modules/core/db/sql/prisma-client'
import { CreateOrderHandlerImpl } from './modules/order/application/command/create-order'
import { CreateOrderSqlRepository } from './modules/order/infra/repository/sql/create-order'
import { CreateOrderControllerImpl } from './modules/order/presentation/controller/create-order'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/beer', (req: Request, res) => {
	const { query } = req

	const controller = new ListBeerControllerImpl(new ListBeerHandlerImpl(BeerModel))

	controller
		.execute({
			query: {
				abv: query.abv ? Number(query.abv) : undefined,
				ebc: query.ebc ? Number(query.ebc) : undefined,
				ibu: query.ibu ? Number(query.ibu) : undefined,
				name: query.name as string,
				limit: query.limit ? Number(query.limit) : undefined,
				page: query.page ? Number(query.page) : undefined,
			},
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

app.get('/beer/:id', (req: Request, res) => {
	const { id } = req.params

	const controller = new FindBeerControllerImpl(new FindBeerHandlerImpl(BeerModel))

	controller
		.execute({
			params: {
				id: id,
			},
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

app.post('/checkout', (req: Request, res) => {
	const handler = new CreateOrderHandlerImpl(
		new CreateOrderSqlRepository(prismaClient),
		new FindBeerSqlRepository(prismaClient),
	)

	const controller = new CreateOrderControllerImpl(handler)

	controller
		.execute({
			body: req.body,
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

// servir a pasta assets como estática
app.use('/assets', express.static('assets'))

app.listen(3333, () => {
	console.log('Server listening on port 3000')
})
