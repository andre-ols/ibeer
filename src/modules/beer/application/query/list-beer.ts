import { PrismaClient } from '@prisma/client'
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
	constructor(private readonly prismaClient: PrismaClient) {}

	async execute(query: ListBeerQuery) {
		const pagination = new Pagination()
		pagination.setPage(query.page)
		pagination.setLimit(query.limit)

		// find and count in one query
		const total = await this.prismaClient.beer.count({
			where: {
				name: {
					contains: query.name,
				},
				abv: query.abv,
				ibu: query.ibu,
				ebc: query.ebc,
			},
		})

		const beers = await this.prismaClient.beer.findMany({
			skip: pagination.getOffset(),
			take: pagination.getLimit(),
			where: {
				name: {
					contains: query.name,
				},
				abv: query.abv,
				ibu: query.ibu,
				ebc: query.ebc,
			},
			include: {
				category: true,
			},
		})

		return {
			beers,
			total,
		}
	}
}
