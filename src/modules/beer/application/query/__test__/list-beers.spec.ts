import { Pagination } from '../../../../core/querying/pagination'
import { ListBeersQueryImpl } from '../list-beers'

const makeSut = () => {
	const listBeerRepository = {
		execute: jest.fn(),
	}

	const sut = new ListBeersQueryImpl(listBeerRepository)

	const listOptions = {
		pagination: new Pagination(),
	}

	return {
		sut,
		listBeerRepository,
		listOptions,
	}
}

describe('ListBeersQueryImpl', () => {
	test('should call listBeerRepository.execute with the correct parameters', async () => {
		const { sut, listBeerRepository, listOptions } = makeSut()

		const params = {
			search: 'Sample',
			abv: 5.0,
			ibu: 20,
			ebc: 10,
			beerName: 'Sample',
		}

		await sut.execute(params, listOptions)

		expect(listBeerRepository.execute).toHaveBeenCalledWith(params, listOptions)
	})

	test('should return the result from listBeerRepository.execute', async () => {
		const { sut, listBeerRepository, listOptions } = makeSut()

		const expectedResult = {
			beers: [
				{
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
				},
			],
			total: 1,
		}

		listBeerRepository.execute.mockResolvedValue(expectedResult)

		const result = await sut.execute({}, listOptions)

		expect(result).toEqual(expectedResult)
	})

	test('should throw an error if listBeerRepository.execute throws an exception', async () => {
		const { sut, listBeerRepository, listOptions } = makeSut()
		const error = new Error('Query execution failed')
		listBeerRepository.execute.mockRejectedValue(error)

		await expect(sut.execute({}, listOptions)).rejects.toThrow(error)
	})
})
