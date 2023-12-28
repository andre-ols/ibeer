import { BeerModel } from '@/modules/core/db/nosql/schema'
import { NotFoundError } from '@/modules/core/errors/not-found'

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
	constructor(private readonly beerModel: typeof BeerModel) {}

	async execute(query: FindBeerQuery) {
		const beer = await this.beerModel.findOne({ id: query.id }).lean()

		if (!beer) {
			throw new NotFoundError('Beer')
		}

		return beer
	}
}
