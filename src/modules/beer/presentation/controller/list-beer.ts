import { Pagination } from '../../../core/querying/pagination'
import { ListBeersQuery } from '../../application/query/list-beers'

export interface ListBeersController {
	execute(request: ListBeersController.Request): Promise<ListBeersController.Result>
}

export namespace ListBeersController {
	export type Request = {
		query: {
			search?: string
			abv?: number
			ibu?: number
			ebc?: number
			beerName?: string
			page?: number
			limit?: number
		}
	}

	export type Result = {
		statusCode: number
		data: {
			beers: Array<{
				id: number
				name: string
				description: string
				imageUrl: string
				abv: number
				ibu: number
				ebc: number
				category: string
				foodPairing: string[]
				brewersTips: string
				createdAt: Date
				updatedAt: Date
			}>
			total: number
		}
		error?: Error
	}
}

export class ListBeersControllerImpl implements ListBeersController {
	constructor(private readonly listBeersQuery: ListBeersQuery) {}

	async execute(request: ListBeersController.Request): Promise<ListBeersController.Result> {
		const { query } = request
		const { search, abv, ibu, ebc, beerName, page, limit } = query
		const params = { search, abv, ibu, ebc, beerName }

		const pagination = new Pagination({
			page,
			limit,
		})
		const options = { pagination }

		const result = await this.listBeersQuery.execute(params, options)

		return {
			statusCode: 200,
			data: result,
		}
	}
}
