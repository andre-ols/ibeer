import { Beer } from '../model/beer'

export interface ListBeerRepository {
	execute(params: ListBeerRepository.Params): Promise<Beer[]>
}

export namespace ListBeerRepository {
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
