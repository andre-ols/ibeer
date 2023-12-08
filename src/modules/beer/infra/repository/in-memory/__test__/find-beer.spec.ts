import { ListBeerRepository } from '../../../../domain/repository/beer'
import { FindBeerInMemoryRepository } from '../find-beer'

const makeSut = () => {
	const beers: ListBeerRepository.Result['beers'] = []
	const sut = new FindBeerInMemoryRepository(beers)

	return {
		sut,
		beers,
	}
}

describe('FindBeerInMemoryRepository', () => {
	test('should return a beer', async () => {
		const { sut, beers } = makeSut()

		const beer = {
			id: 1,
			name: 'Sample Beer',
			description: 'A sample beer description.',
			imageUrl: 'sample.jpg',
			abv: 5.0,
			ibu: 20,
			ebc: 10,
			category: 'Sample Category',
			foodPairing: ['Food 1', 'Food 2'],
			brewersTips: 'Some brewing tips.',
			createdAt: new Date('2023-01-01'),
			updatedAt: new Date('2023-01-01'),
		}

		beers.push(beer)

		const result = await sut.execute({ id: beer.id })

		expect(result).toEqual(beer)
	})

	test('should throw if beer is not found', async () => {
		const { sut } = makeSut()

		const promise = sut.execute({ id: 1 })

		await expect(promise).rejects.toThrow()
	})
})
