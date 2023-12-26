import { ListBeerHandlerImpl, ListBeerQuery } from '../list-beer'

const makeSut = () => {
	const prismaClient = {
		beer: {
			findMany: jest.fn(),
			count: jest.fn(),
		},
	}

	const listBeerQuery = new ListBeerQuery({
		limit: 10,
		page: 1,
		abv: 5.0,
		ebc: 10,
		ibu: 20,
		name: 'Sample',
	})

	const sut = new ListBeerHandlerImpl(prismaClient as any)

	return {
		sut,
		listBeerQuery,
		prismaClient,
	}
}

describe('ListBeerHandlerImpl', () => {
	test('should call prisma client with the correct parameters', async () => {
		// arrange
		const { sut, prismaClient, listBeerQuery } = makeSut()

		jest.spyOn(prismaClient.beer, 'count').mockResolvedValueOnce(0)

		// act
		await sut.execute(listBeerQuery)

		expect(prismaClient.beer.count).toHaveBeenCalledWith({
			where: {
				name: {
					contains: listBeerQuery.name,
					mode: 'insensitive',
				},
				abv: listBeerQuery.abv,
				ibu: listBeerQuery.ibu,
				ebc: listBeerQuery.ebc,
			},
		})

		expect(prismaClient.beer.findMany).toHaveBeenCalledWith({
			where: {
				name: {
					contains: listBeerQuery.name,
				},
				abv: listBeerQuery.abv,
				ibu: listBeerQuery.ibu,
				ebc: listBeerQuery.ebc,
			},
			take: listBeerQuery.limit,
			skip: listBeerQuery.limit * (listBeerQuery.page - 1),
			include: {
				category: true,
			},
		})
	})
	test('should return the result from prisma client', async () => {
		const { sut, prismaClient, listBeerQuery } = makeSut()

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

		jest.spyOn(prismaClient.beer, 'count').mockResolvedValueOnce(1)
		jest.spyOn(prismaClient.beer, 'findMany').mockResolvedValue([
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
		])

		const result = await sut.execute(listBeerQuery)

		expect(result).toEqual(expectedResult)
	})
})
