import { ListBeerHandlerImpl, ListBeerQuery } from '../list-beer'

const makeSut = () => {
	const beerModel = {
		find: jest.fn().mockReturnThis(),
		skip: jest.fn().mockReturnThis(),
		limit: jest.fn().mockReturnThis(),
		lean: jest.fn().mockResolvedValue([]),
		countDocuments: jest.fn(),
	}

	const listBeerQuery = new ListBeerQuery({
		limit: 10,
		page: 1,
		abv: 5.0,
		ebc: 10,
		ibu: 20,
		name: 'Sample',
	})

	const sut = new ListBeerHandlerImpl(beerModel as any)

	return {
		sut,
		listBeerQuery,
		beerModel,
	}
}

describe('ListBeerHandlerImpl', () => {
	test('should call prisma client with the correct parameters', async () => {
		// arrange
		const { sut, beerModel, listBeerQuery } = makeSut()

		const queryFilter = {
			...(listBeerQuery.name !== undefined
				? { name: { $regex: new RegExp(listBeerQuery.name, 'i') } }
				: {}),
			...(listBeerQuery.abv !== undefined ? { abv: listBeerQuery.abv } : {}),
			...(listBeerQuery.ibu !== undefined ? { ibu: listBeerQuery.ibu } : {}),
			...(listBeerQuery.ebc !== undefined ? { ebc: listBeerQuery.ebc } : {}),
		}

		jest.spyOn(beerModel, 'countDocuments').mockResolvedValueOnce(0)

		// act
		await sut.execute(listBeerQuery)

		expect(beerModel.countDocuments).toHaveBeenCalledWith(queryFilter)

		expect(beerModel.find).toHaveBeenCalledWith(queryFilter)

		expect(beerModel.skip).toHaveBeenCalledWith(0)

		expect(beerModel.limit).toHaveBeenCalledWith(10)
	})
	test('should return the result from prisma client', async () => {
		const { sut, beerModel, listBeerQuery } = makeSut()

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

		jest.spyOn(beerModel, 'countDocuments').mockResolvedValueOnce(1)
		jest.spyOn(beerModel, 'lean').mockResolvedValue([
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
