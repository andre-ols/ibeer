import { badRequest, ok } from '../../../core/api/helpers/http-response'
import { HttpResponse } from '../../../core/protocols/http'
import { Pagination } from '../../../core/querying/pagination'
import { ListBeerHandler } from '../../application/query/list-beer'

export interface ListBeerController {
	execute(request: ListBeerController.Request): Promise<ListBeerController.Result>
}

export namespace ListBeerController {
	export type Request = {
		query: {
			abv?: number
			ibu?: number
			ebc?: number
			name?: string
			page?: number
			limit?: number
		}
	}

	export type Result = HttpResponse<
		Array<{
			id: string
			name: string
			description: string
			imageUrl: string
			abv: number
			ibu: number
			ebc: number
			category: {
				id: string
				name: string
				createdAt: Date
				updatedAt: Date
			}
			foodPairing: string[]
			brewersTips: string
			createdAt: Date
			updatedAt: Date
		}>
	>
}

export class ListBeerControllerImpl implements ListBeerController {
	constructor(private readonly listBeerHandler: ListBeerHandler) {}

	async execute(request: ListBeerController.Request): Promise<ListBeerController.Result> {
		const { query } = request
		const { abv, ibu, ebc, name, page, limit } = query
		const params = { abv, ibu, ebc, name }

		const pagination = new Pagination()

		try {
			page && pagination.setPage(page)
			limit && pagination.setLimit(limit)
		} catch (error) {
			return badRequest(error.message)
		}

		const result = await this.listBeerHandler.execute({
			limit: pagination.getLimit(),
			page: pagination.getPage(),
			abv: params.abv,
			ebc: params.ebc,
			ibu: params.ibu,
			name: params.name,
		})

		return ok(result.beers, {
			page: pagination.getPage(),
			limit: pagination.getLimit(),
			totalCount: result.total,
		})
	}
}
