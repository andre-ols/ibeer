import { CategoryBuilder } from '@/modules/beer/domain/model/category'
import { Abv } from '@/modules/beer/domain/value-object/abv'
import { CreatedAt } from '@/modules/beer/domain/value-object/created-at'
import { Ebc } from '@/modules/beer/domain/value-object/ebc'
import { Ibu } from '@/modules/beer/domain/value-object/ibu'
import { UpdatedAt } from '@/modules/beer/domain/value-object/updated-at'
import { NotFoundError } from '../../../../core/errors/not-found'
import { BeerBuilder } from '../../../domain/aggreagate/beer'
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
					.withAbv(new Abv(beer.abv))
					.withIbu(new Ibu(beer.ibu))
					.withEbc(new Ebc(beer.ebc))
					.withCategory(
						new CategoryBuilder()
							.withId(beer.category.id)
							.withName(beer.category.name)
							.withCreatedAt(new CreatedAt(beer.category.createdAt))
							.withUpdatedAt(new UpdatedAt(beer.category.updatedAt))
							.build(),
					)
					.withFoodPairing(beer.foodPairing)
					.withBrewersTips(beer.brewersTips)
					.withCreatedAt(new CreatedAt(beer.createdAt))
					.withUpdatedAt(new UpdatedAt(beer.updatedAt))
					.build(),
			)
		})
	}
}
