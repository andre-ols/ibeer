import { Request, Response, Router } from 'express'
import { BeerModel } from '../core/database/nosql/schema'
import { FindBeerHandlerImpl } from './application/query/find-beer'
import { ListBeerHandlerImpl } from './application/query/list-beer'
import { FindBeerControllerImpl } from './presentation/controller/find-beer'
import { ListBeerControllerImpl } from './presentation/controller/list-beer'

export const beerRouter = Router()

beerRouter.get('/', (req: Request, res: Response) => {
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
			body: undefined,
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

beerRouter.get('/:id', (req: Request, res) => {
	const { id } = req.params

	const controller = new FindBeerControllerImpl(new FindBeerHandlerImpl(BeerModel))

	controller
		.execute({
			params: {
				id: id,
			},
			body: undefined,
			query: undefined,
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
