import { DataBeer } from '../beers'
import { FindBeerInMemoryRepository } from '../find-beer'

const makeSut = () => {
	const beers: Array<DataBeer> = []
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
			id: 'id',
			name: 'Sample Beer',
			description: 'A sample beer description.',
			price: 10.0,

			imageUrl: 'sample.jpg',
			abv: 5.0,
			ibu: 20,
			ebc: 10,
			category: {
				id: 'id',
				name: 'Sample Category',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			},
			foodPairing: ['Food 1', 'Food 2'],
			brewersTips: 'Some brewing tips.',
			createdAt: new Date('2023-01-01'),
			updatedAt: new Date('2023-01-01'),
		}

		beers.push(beer)

		const result = await sut.execute({ id: beer.id })

		expect(result.id).toBe(beer.id)
		expect(result.name).toBe(beer.name)
		expect(result.description).toBe(beer.description)
		expect(result.imageUrl).toBe(beer.imageUrl)
		expect(result.abv.getValue()).toBe(beer.abv)
		expect(result.ibu.getValue()).toBe(beer.ibu)
		expect(result.ebc.getValue()).toBe(beer.ebc)
		expect(result.category.id).toBe(beer.category.id)
		expect(result.category.name).toBe(beer.category.name)
		expect(result.category.createdAt.getValue()).toBe(beer.category.createdAt)
		expect(result.category.updatedAt.getValue()).toBe(beer.category.updatedAt)
		expect(result.foodPairing).toEqual(beer.foodPairing)
		expect(result.brewersTips).toBe(beer.brewersTips)
		expect(result.createdAt.getValue()).toBe(beer.createdAt)
		expect(result.updatedAt.getValue()).toBe(beer.updatedAt)
	})

	test('should throw if beer is not found', async () => {
		const { sut } = makeSut()

		const promise = sut.execute({ id: 'id' })

		await expect(promise).rejects.toThrow()
	})
})
