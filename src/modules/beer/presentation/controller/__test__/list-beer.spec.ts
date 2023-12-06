import { ListBeersControllerImpl } from '../list-beer'

const makeSut = () => {
	const listBeersQuery = {
		execute: jest.fn(),
	}

	const sut = new ListBeersControllerImpl(listBeersQuery)

	return {
		sut,
		listBeersQuery,
	}
}

describe('ListBeersControllerImpl', () => {
	test('should return a list of beers', async () => {
		const { sut, listBeersQuery } = makeSut()

		const request = {
			query: {
				search: 'Sample',
				abv: 5.0,
				ibu: 20,
				ebc: 10,
				beerName: 'Sample',
				page: 1,
				limit: 10,
			},
		}

		const response = {
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

		listBeersQuery.execute.mockResolvedValueOnce(response)

		const result = await sut.execute(request)

		expect(result.statusCode).toBe(200)
		expect(result.data).toEqual(response)
	})

	test('should return a bad request error for invalid page', async () => {
		const { sut } = makeSut()

		const request = {
			query: {
				page: -10,
			},
		}

		const result = await sut.execute(request)

		expect(result.statusCode).toBe(400)
		expect(result.error).toBe('Page must be greater than 1')
	})
})
