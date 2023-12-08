import express, { Request } from 'express'
import { ListBeerQueryImpl } from './modules/beer/application/query/list-beer'
import { beers } from './modules/beer/infra/repository/in-memory/beers'
import { ListBeerInMemoryRepository } from './modules/beer/infra/repository/in-memory/list-beer'
import { ListBeerControllerImpl } from './modules/beer/presentation/controller/list-beer'

const app = express()

app.get('/', (req: Request, res) => {
	const { query } = req

	const controller = new ListBeerControllerImpl(
		new ListBeerQueryImpl(new ListBeerInMemoryRepository(beers)),
	)

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
			res.status(result.statusCode).json(result)
		})
		.catch((error) => {
			res.status(500).send({
				error: error.message,
			})
		})
})

app.listen(3000, () => {
	console.log('Server listening on port 3000')
})
