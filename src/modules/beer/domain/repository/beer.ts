import { Pagination } from '../../../core/querying/pagination'
import { BeerBuilder } from '../aggregate/beer'

type Beer = ReturnType<BeerBuilder['build']>

export interface ListBeerRepository {
	execute(options: ListBeerRepository.Options): Promise<ListBeerRepository.Result>
}

export namespace ListBeerRepository {
	export type Options = {
		pagination: Pagination
		filters: {
			abv?: number
			ibu?: number
			ebc?: number
			name?: string
		}
	}

	export type Result = {
		beers: Array<Beer>
		total: number
	}
}

export interface FindBeerRepository {
	execute(params: FindBeerRepository.Params): Promise<FindBeerRepository.Result>
}

export namespace FindBeerRepository {
	export type Params = {
		id: string
	}

	export type Result = Beer
}

export interface CreateBeerRepository {
	execute(params: CreateBeerRepository.Params): Promise<void>
}

export namespace CreateBeerRepository {
	export type Params = Beer
}
