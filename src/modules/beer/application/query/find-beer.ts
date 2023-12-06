import { FindBeerRepository } from '../../domain/repository/beer'

export interface FindBeerQuery {
	execute(params: FindBeerQuery.Params): Promise<FindBeerQuery.Result>
}

export namespace FindBeerQuery {
	export type Params = FindBeerRepository.Params

	export type Result = FindBeerRepository.Result
}

export class FindBeerQueryImpl implements FindBeerQuery {
	constructor(private readonly beerRepository: FindBeerRepository) {}

	async execute(params: FindBeerQuery.Params) {
		return this.beerRepository.execute(params)
	}
}
