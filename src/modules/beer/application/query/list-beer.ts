import { Pagination } from '../../../core/querying/pagination'
import { ListBeerRepository } from '../../domain/repository/beer'

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
	constructor(private readonly beerRepository: ListBeerRepository) {}

	async execute(query: ListBeerQuery) {
		const pagination = new Pagination()
		pagination.setPage(query.page)
		pagination.setLimit(query.limit)
		const { beers, total } = await this.beerRepository.execute({
			filters: {
				abv: query.abv,
				ibu: query.ibu,
				ebc: query.ebc,
				name: query.name,
			},
			pagination: pagination,
		})

		return {
			beers: beers.map((beer) => beer.toJSON()),
			total,
		}
	}
}
