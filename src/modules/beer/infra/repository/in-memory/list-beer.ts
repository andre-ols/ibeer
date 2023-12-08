import { ListBeerRepository } from '../../../domain/repository/beer'

export class ListBeerInMemoryRepository implements ListBeerRepository {
	constructor(private readonly beers: ListBeerRepository.Result['beers']) {}

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

			resolve({
				beers: paginatedBeer,
				total,
			})
		})
	}
}
