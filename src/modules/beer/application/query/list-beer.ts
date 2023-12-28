import { BeerModel } from '@/modules/core/db/nosql/mongo-client'
import { Pagination } from '../../../core/querying/pagination'

export class ListBeerQuery {
	page: number
	limit: number
	name?: string
	abv?: number
	ibu?: number
	ebc?: number

	constructor(params: ListBeerQuery) {
		Object.assign(this, params)
	}
}
export interface ListBeerHandler {
	execute(query: ListBeerQuery): Promise<{
		beers: {
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
		}[]
		total: number
	}>
}

export class ListBeerHandlerImpl implements ListBeerHandler {
	constructor(private readonly beerModel: typeof BeerModel) {}

	async execute(query: ListBeerQuery) {
		const pagination = new Pagination()
		pagination.setPage(query.page)
		pagination.setLimit(query.limit)

		const nameFilter = query.name ? { name: { $regex: new RegExp(query.name, 'i') } } : {}
		const queryFilter = {
			...nameFilter,
			...(query.abv !== undefined ? { abv: query.abv } : {}),
			...(query.ibu !== undefined ? { ibu: query.ibu } : {}),
			...(query.ebc !== undefined ? { ebc: query.ebc } : {}),
		}

		const [beers, total] = await Promise.all([
			this.beerModel
				.find(queryFilter)
				.skip(pagination.getOffset())
				.limit(pagination.getLimit())
				.lean(), // Use lean() to get plain JavaScript objects instead of Mongoose documents

			this.beerModel.countDocuments(queryFilter),
		])

		return {
			beers,
			total,
		}
	}
}
