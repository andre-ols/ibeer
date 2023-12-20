import 'module-alias/register'

import express, { Request } from 'express'
import { prismaClient } from './db/prisma-client'
import { FindBeerHandlerImpl } from './modules/beer/application/query/find-beer'
import { ListBeerHandlerImpl } from './modules/beer/application/query/list-beer'
import { FindBeerControllerImpl } from './modules/beer/presentation/controller/find-beer'
import { ListBeerControllerImpl } from './modules/beer/presentation/controller/list-beer'

const app = express()

app.get('/beer', (req: Request, res) => {
	const { query } = req

	const controller = new ListBeerControllerImpl(new ListBeerHandlerImpl(prismaClient))

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

	const controller = new FindBeerControllerImpl(new FindBeerHandlerImpl(prismaClient))

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

// servir a pasta assets como estática
app.use('/assets', express.static('assets'))

app.listen(3333, () => {
	console.log('Server listening on port 3000')
})
