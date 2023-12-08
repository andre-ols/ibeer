import { NotFoundError } from '../../../../core/errors/not-found'
import { FindBeerRepository, ListBeerRepository } from '../../../domain/repository/beer'

export class FindBeerInMemoryRepository implements FindBeerRepository {
	constructor(private readonly beers: ListBeerRepository.Result['beers']) {}

	execute(params: FindBeerRepository.Params): Promise<FindBeerRepository.Result> {
		return new Promise((resolve, reject) => {
			const beer = this.beers.find((beer) => beer.id === params.id)

			if (!beer) {
				return reject(new NotFoundError('Beer'))
			}

			resolve(beer)
		})
	}
}
