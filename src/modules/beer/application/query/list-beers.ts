import { ListBeerRepository } from '../../domain/repository/beer'

export interface ListBeersQuery {
	execute(
		params: ListBeersQuery.Params,
		option: ListBeerRepository.Options,
	): Promise<ListBeersQuery.Result>
}

export namespace ListBeersQuery {
	export type Params = ListBeerRepository.Params

	export type Result = ListBeerRepository.Result

	export type Options = ListBeerRepository.Options
}

export class ListBeersQueryImpl implements ListBeersQuery {
	constructor(private readonly beerRepository: ListBeerRepository) {}

	async execute(params: ListBeersQuery.Params, options: ListBeersQuery.Options) {
		return this.beerRepository.execute(params, options)
	}
}
