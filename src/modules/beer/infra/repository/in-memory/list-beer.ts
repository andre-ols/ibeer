import { BeerBuilder } from '../../../domain/model/beer'
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
					.withImageUrl(beer.imageUrl)
					.withAbv(beer.abv)
					.withIbu(beer.ibu)
					.withEbc(beer.ebc)
					.withCategory(beer.category)
					.withFoodPairing(beer.foodPairing)
					.withBrewersTips(beer.brewersTips)
					.withCreatedAt(beer.createdAt)
					.withUpdatedAt(beer.updatedAt)
					.build()
			})

			resolve({
				beers,
				total,
			})
		})
	}
}
