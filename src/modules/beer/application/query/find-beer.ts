import { NotFoundError } from '@/modules/core/errors/not-found'
import { PrismaClient } from '@prisma/client'

export class FindBeerQuery {
	id: string

	constructor(params: FindBeerQuery) {
		Object.assign(this, params)
	}
}
export interface FindBeerHandler {
	execute(query: FindBeerQuery): Promise<{
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
}
export class FindBeerHandlerImpl implements FindBeerHandler {
	constructor(private readonly prismaClient: PrismaClient) {}

	async execute(query: FindBeerQuery) {
		const beer = await this.prismaClient.beer.findUnique({
			where: {
				id: query.id,
			},
			include: {
				category: true,
			},
		})

		if (!beer) {
			throw new NotFoundError('Beer')
		}

		return beer
	}
}
