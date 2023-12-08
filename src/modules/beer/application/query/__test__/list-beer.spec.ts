import { Pagination } from '../../../../core/querying/pagination'
import { ListBeerQueryImpl } from '../list-beer'

const makeSut = () => {
	const listBeerRepository = {
		execute: jest.fn(),
	}

	const sut = new ListBeerQueryImpl(listBeerRepository)

	const listOptions = {
		pagination: new Pagination(),
		filters: {},
	}

	return {
		sut,
		listBeerRepository,
		listOptions,
	}
}

describe('ListBeerQueryImpl', () => {
	test('should call listBeerRepository.execute with the correct parameters', async () => {
		const { sut, listBeerRepository, listOptions } = makeSut()

		await sut.execute(listOptions)

		expect(listBeerRepository.execute).toHaveBeenCalledWith(listOptions)
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

		const result = await sut.execute(listOptions)

		expect(result).toEqual(expectedResult)
	})

	test('should throw an error if listBeerRepository.execute throws an exception', async () => {
		const { sut, listBeerRepository, listOptions } = makeSut()
		const error = new Error('Query execution failed')
		listBeerRepository.execute.mockRejectedValue(error)

		await expect(sut.execute(listOptions)).rejects.toThrow(error)
	})
})
