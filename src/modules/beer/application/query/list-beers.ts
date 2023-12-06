import { Beer } from '../../domain/model/beer'
import { ListBeerRepository } from '../../domain/repository/beer'

export interface ListBeersQuery {
	execute(params: ListBeersQuery.Params): Promise<Beer[]>
}

export namespace ListBeersQuery {
	export type Params = {
		page: number
		limit: number
		search?: string
		abv?: number
		ibu?: number
		ebc?: number
		beerName?: string
	}
}

export class ListBeersQueryImpl implements ListBeersQuery {
	constructor(private readonly beerRepository: ListBeerRepository) {}

	async execute(params: ListBeersQuery.Params): Promise<Beer[]> {
		return this.beerRepository.execute(params)
	}
}
