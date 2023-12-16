import { Pagination } from '../../../core/querying/pagination'
import { BeerBuilder } from '../model/beer'

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
	execute(params: CreateBeerRepository.Params): Promise<CreateBeerRepository.Result>
}

export namespace CreateBeerRepository {
	export type Params = Beer

	export type Result = Beer
}
