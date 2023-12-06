import { badRequest, ok } from '../../../core/api/helpers/http-response'
import { HttpResponse } from '../../../core/protocols/http'
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

	export type Result = HttpResponse<{
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
	}>
}

export class ListBeersControllerImpl implements ListBeersController {
	constructor(private readonly listBeersQuery: ListBeersQuery) {}

	async execute(request: ListBeersController.Request): Promise<ListBeersController.Result> {
		const { query } = request
		const { search, abv, ibu, ebc, beerName, page, limit } = query
		const params = { search, abv, ibu, ebc, beerName }

		const pagination = new Pagination()

		try {
			page && pagination.setPage(page)
			limit && pagination.setLimit(limit)
		} catch (error) {
			return badRequest(error.message)
		}

		const options = { pagination }

		const result = await this.listBeersQuery.execute(params, options)

		return ok(result)
	}
}
