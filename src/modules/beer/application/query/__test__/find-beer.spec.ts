import { FindBeerHandlerImpl } from '../find-beer'

const makeSut = () => {
	const prismaClient = {
		beer: {
			findUnique: jest.fn(),
		},
	}

	const sut = new FindBeerHandlerImpl(prismaClient as any)

	return {
		sut,
		prismaClient,
	}
}

describe('FindBeerHandlerImpl', () => {
	test('should call findBeerRepository.execute with the correct parameters', async () => {
		const { sut, prismaClient } = makeSut()

		const findBeerQuery = {
			id: '1',
		}

		jest.spyOn(prismaClient.beer, 'findUnique').mockResolvedValueOnce({
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
		})

		await sut.execute(findBeerQuery)

		expect(prismaClient.beer.findUnique).toHaveBeenCalledWith({
			where: {
				id: findBeerQuery.id,
			},
			include: {
				category: true,
			},
		})
	})
})
