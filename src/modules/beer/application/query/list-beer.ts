import { ListBeerRepository } from '../../domain/repository/beer'

export interface ListBeerQuery {
	execute(option: ListBeerRepository.Options): Promise<ListBeerQuery.Result>
}

export namespace ListBeerQuery {
	export type Result = ListBeerRepository.Result

	export type Options = ListBeerRepository.Options
}

export class ListBeerQueryImpl implements ListBeerQuery {
	constructor(private readonly beerRepository: ListBeerRepository) {}

	async execute(options: ListBeerQuery.Options) {
		return this.beerRepository.execute(options)
	}
}
