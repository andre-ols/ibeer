import { FindBeerRepository } from '../../domain/repository/beer'

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
	constructor(private readonly beerRepository: FindBeerRepository) {}

	async execute(query: FindBeerQuery) {
		const beer = await this.beerRepository.execute(query)

		return beer.toJSON()
	}
}
