import { Pagination } from '../../../../../core/querying/pagination'
import { ListBeerRepository } from '../../../../domain/repository/beer'
import { DataBeer } from '../beers'
import { ListBeerInMemoryRepository } from '../list-beer'

const makeSut = () => {
	const beers: Array<DataBeer> = []

	const sut = new ListBeerInMemoryRepository(beers)

	const options: ListBeerRepository.Options = {
		filters: {},
		pagination: new Pagination(),
	}

	return {
		sut,
		options,
		beers,
	}
}

describe('ListBeerInMemoryRepository', () => {
	test('should return a list of beers', async () => {
		// arrange
		const { sut, options, beers } = makeSut()

		beers.push({
			id: 'id-1',
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
		})

		// act
		const result = await sut.execute(options)

		// assert
		expect(result).toEqual({
			beers: [
				{
					id: 'id-1',
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
				},
			],
			total: 1,
		})
	})

	describe('when filtering by abv', () => {
		test('should return a list of beers with the correct abv', async () => {
			const { sut, options, beers } = makeSut()

			beers.push({
				id: 'id-1',
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
			})

			beers.push({
				id: 'id-2',
				name: 'Sample Beer 2',
				description: 'A sample beer description.',
				imageUrl: 'sample.jpg',
				abv: 10.0,
				ibu: 20,
				ebc: 10,
				category: 'Sample Category',
				foodPairing: ['Food 1', 'Food 2'],
				brewersTips: 'Some brewing tips.',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})

			options.filters.abv = 5.0

			const result = await sut.execute(options)

			expect(result).toEqual({
				beers: [
					{
						id: 'id-1',
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
					},
				],
				total: 1,
			})
		})

		test('should return an empty list if no beer matches the abv', async () => {
			const { sut, options, beers } = makeSut()

			beers.push({
				id: 'id-1',
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
			})

			beers.push({
				id: 'id-2',
				name: 'Sample Beer 2',
				description: 'A sample beer description.',
				imageUrl: 'sample.jpg',
				abv: 10.0,
				ibu: 20,
				ebc: 10,
				category: 'Sample Category',
				foodPairing: ['Food 1', 'Food 2'],
				brewersTips: 'Some brewing tips.',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})

			options.filters.abv = 15.0

			const result = await sut.execute(options)

			expect(result).toEqual({
				beers: [],
				total: 0,
			})
		})
	})

	describe('when filtering by ibu', () => {
		test('should return a list of beers with the correct ibu', async () => {
			const { sut, options, beers } = makeSut()

			beers.push({
				id: 'id-1',
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
			})

			beers.push({
				id: 'id-2',
				name: 'Sample Beer 2',
				description: 'A sample beer description.',
				imageUrl: 'sample.jpg',
				abv: 10.0,
				ibu: 30,
				ebc: 10,
				category: 'Sample Category',
				foodPairing: ['Food 1', 'Food 2'],
				brewersTips: 'Some brewing tips.',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})

			options.filters.ibu = 20

			const result = await sut.execute(options)

			expect(result).toEqual({
				beers: [
					{
						id: 'id-1',
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
					},
				],
				total: 1,
			})
		})

		test('should return an empty list if no beer matches the ibu', async () => {
			const { sut, options, beers } = makeSut()

			beers.push({
				id: 'id-1',
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
			})

			beers.push({
				id: 'id-2',
				name: 'Sample Beer 2',
				description: 'A sample beer description.',
				imageUrl: 'sample.jpg',
				abv: 10.0,
				ibu: 30,
				ebc: 10,
				category: 'Sample Category',
				foodPairing: ['Food 1', 'Food 2'],
				brewersTips: 'Some brewing tips.',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})

			options.filters.ibu = 40

			const result = await sut.execute(options)

			expect(result).toEqual({
				beers: [],
				total: 0,
			})
		})
	})

	describe('when filtering by ebc', () => {
		test('should return a list of beers with the correct ebc', async () => {
			const { sut, options, beers } = makeSut()

			beers.push({
				id: 'id-1',
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
			})

			beers.push({
				id: 'id-2',
				name: 'Sample Beer 2',
				description: 'A sample beer description.',
				imageUrl: 'sample.jpg',
				abv: 10.0,
				ibu: 30,
				ebc: 20,
				category: 'Sample Category',
				foodPairing: ['Food 1', 'Food 2'],
				brewersTips: 'Some brewing tips.',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})

			options.filters.ebc = 10

			const result = await sut.execute(options)

			expect(result).toEqual({
				beers: [
					{
						id: 'id-1',
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
					},
				],
				total: 1,
			})
		})

		test('should return an empty list if no beer matches the ebc', async () => {
			const { sut, options, beers } = makeSut()

			beers.push({
				id: 'id-1',
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
			})

			beers.push({
				id: 'id-2',
				name: 'Sample Beer 2',
				description: 'A sample beer description.',
				imageUrl: 'sample.jpg',
				abv: 10.0,
				ibu: 30,
				ebc: 20,
				category: 'Sample Category',
				foodPairing: ['Food 1', 'Food 2'],
				brewersTips: 'Some brewing tips.',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})

			options.filters.ebc = 40

			const result = await sut.execute(options)

			expect(result).toEqual({
				beers: [],
				total: 0,
			})
		})
	})

	describe('when filtering by name', () => {
		test('should return a list of beers with the correct name', async () => {
			const { sut, options, beers } = makeSut()

			beers.push({
				id: 'id-1',
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
			})

			beers.push({
				id: 'id-2',
				name: 'Sample 2',
				description: 'A sample beer description.',
				imageUrl: 'sample.jpg',
				abv: 10.0,
				ibu: 30,
				ebc: 20,
				category: 'Sample Category',
				foodPairing: ['Food 1', 'Food 2'],
				brewersTips: 'Some brewing tips.',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})

			options.filters.name = 'Sample Beer'

			const result = await sut.execute(options)

			expect(result).toEqual({
				beers: [
					{
						id: 'id-1',
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
					},
				],
				total: 1,
			})
		})

		test('should return an empty list if no beer matches the name', async () => {
			const { sut, options, beers } = makeSut()

			beers.push({
				id: 'id-1',
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
			})

			beers.push({
				id: 'id-2',
				name: 'Sample Beer 2',
				description: 'A sample beer description.',
				imageUrl: 'sample.jpg',
				abv: 10.0,
				ibu: 30,
				ebc: 20,
				category: 'Sample Category',
				foodPairing: ['Food 1', 'Food 2'],
				brewersTips: 'Some brewing tips.',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})

			options.filters.name = 'Sample Beer 3'

			const result = await sut.execute(options)

			expect(result).toEqual({
				beers: [],
				total: 0,
			})
		})
	})
})
