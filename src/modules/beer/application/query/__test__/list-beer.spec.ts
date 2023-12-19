import { Pagination } from '@/modules/core/querying/pagination'
import { ListBeerHandlerImpl, ListBeerQuery } from '../list-beer'

const makeSut = () => {
	const listBeerRepository = {
		execute: jest.fn(),
	}

	const sut = new ListBeerHandlerImpl(listBeerRepository)

	const listBeerQuery = new ListBeerQuery({
		limit: 10,
		page: 1,
		abv: 5.0,
		ebc: 10,
		ibu: 20,
		name: 'Sample',
	})

	return {
		sut,
		listBeerRepository,
		listBeerQuery,
	}
}

describe('ListBeerHandlerImpl', () => {
	test('should call listBeerRepository.execute with the correct parameters', async () => {
		const { sut, listBeerRepository, listBeerQuery } = makeSut()

		jest.spyOn(listBeerRepository, 'execute').mockResolvedValueOnce({ beers: [], total: 0 })

		await sut.execute(listBeerQuery)

		const pagination = new Pagination()
		pagination.setPage(listBeerQuery.page)
		pagination.setLimit(listBeerQuery.limit)

		expect(listBeerRepository.execute).toHaveBeenCalledWith({
			filters: {
				abv: listBeerQuery.abv,
				ibu: listBeerQuery.ibu,
				ebc: listBeerQuery.ebc,
				name: listBeerQuery.name,
			},
			pagination: pagination,
		})
	})

	test('should return the result from listBeerRepository.execute', async () => {
		const { sut, listBeerRepository, listBeerQuery } = makeSut()

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

		jest.spyOn(listBeerRepository, 'execute').mockResolvedValueOnce({
			beers: [
				{
					toJSON: () => ({
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
					}),
				},
			],
			total: 1,
		})

		const result = await sut.execute(listBeerQuery)

		expect(result).toEqual(expectedResult)
	})

	test('should throw an error if listBeerRepository.execute throws an exception', async () => {
		const { sut, listBeerRepository, listBeerQuery } = makeSut()
		const error = new Error('Query execution failed')
		listBeerRepository.execute.mockRejectedValue(error)

		await expect(sut.execute(listBeerQuery)).rejects.toThrow(error)
	})
})
