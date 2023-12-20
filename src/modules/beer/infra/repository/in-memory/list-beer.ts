import { CategoryBuilder } from '@/modules/beer/domain/model/category'
import { Abv } from '@/modules/beer/domain/value-object/abv'
import { CreatedAt } from '@/modules/beer/domain/value-object/created-at'
import { Ebc } from '@/modules/beer/domain/value-object/ebc'
import { Ibu } from '@/modules/beer/domain/value-object/ibu'
import { UpdatedAt } from '@/modules/beer/domain/value-object/updated-at'
import { BeerBuilder } from '../../../domain/aggreagate/beer'
import { ListBeerRepository } from '../../../domain/repository/beer'
import { DataBeer } from './beers'

export class ListBeerInMemoryRepository implements ListBeerRepository {
	constructor(private readonly beers: Array<DataBeer>) {}

	execute(options: ListBeerRepository.Options): Promise<ListBeerRepository.Result> {
		return new Promise((resolve) => {
			const { pagination, filters } = options

			const filteredBeer = this.beers.filter((beer) => {
				if (filters.abv && beer.abv !== filters.abv) {
					return false
				}

				if (filters.ibu && beer.ibu !== filters.ibu) {
					return false
				}

				if (filters.ebc && beer.ebc !== filters.ebc) {
					return false
				}

				if (filters.name && !beer.name.toLowerCase().includes(filters.name.toLowerCase())) {
					return false
				}

				return true
			})

			const total = filteredBeer.length

			const paginatedBeer = filteredBeer.slice(
				pagination.getOffset(),
				pagination.getOffset() + pagination.getLimit(),
			)

			const beers = paginatedBeer.map((beer) => {
				return new BeerBuilder()
					.withId(beer.id)
					.withName(beer.name)
					.withDescription(beer.description)
					.withPrice(beer.price)
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
					.build()
			})

			resolve({
				beers,
				total,
			})
		})
	}
}
