import { Pagination } from '../../../core/querying/pagination'

export interface ListBeerRepository {
	execute(
		params: ListBeerRepository.Params,
		options: ListBeerRepository.Options,
	): Promise<ListBeerRepository.Result>
}

export namespace ListBeerRepository {
	export type Params = {
		search?: string
		abv?: number
		ibu?: number
		ebc?: number
		beerName?: string
	}

	export type Options = {
		pagination: Pagination
	}

	export type Result = {
		beers: Array<{
			id: number
			name: string
			description: string
			imageUrl: string
			abv: number
			ibu: number
			ebc: number
			category: string
			foodPairing: string[]
			brewersTips: string
			createdAt: Date
			updatedAt: Date
		}>
		total: number
	}
}
