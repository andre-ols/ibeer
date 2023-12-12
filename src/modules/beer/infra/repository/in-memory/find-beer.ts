import { NotFoundError } from '../../../../core/errors/not-found'
import { BeerBuilder } from '../../../domain/model/beer'
import { FindBeerRepository } from '../../../domain/repository/beer'
import { DataBeer } from './beers'

export class FindBeerInMemoryRepository implements FindBeerRepository {
	constructor(private readonly beers: Array<DataBeer>) {}

	execute(params: FindBeerRepository.Params): Promise<FindBeerRepository.Result> {
		return new Promise((resolve, reject) => {
			const beer = this.beers.find((beer) => beer.id === params.id)

			if (!beer) {
				return reject(new NotFoundError('Beer'))
			}

			resolve(
				new BeerBuilder()
					.withId(beer.id)
					.withName(beer.name)
					.withDescription(beer.description)
					.withImageUrl(beer.imageUrl)
					.withAbv(beer.abv)
					.withIbu(beer.ibu)
					.withEbc(beer.ebc)
					.withCategory(beer.category)
					.withFoodPairing(beer.foodPairing)
					.withBrewersTips(beer.brewersTips)
					.withCreatedAt(beer.createdAt)
					.withUpdatedAt(beer.updatedAt)
					.build(),
			)
		})
	}
}
