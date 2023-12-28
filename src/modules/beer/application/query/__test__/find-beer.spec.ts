import { FindBeerHandlerImpl } from '../find-beer'

const makeSut = () => {
	const beerModel = {
		findOne: jest.fn().mockImplementation(() => ({
			lean: jest.fn(),
		})),
	}

	const sut = new FindBeerHandlerImpl(beerModel as any)

	return {
		sut,
		beerModel,
	}
}

describe('FindBeerHandlerImpl', () => {
	test('should call findBeerRepository.execute with the correct parameters', async () => {
		const { sut, beerModel } = makeSut()

		const findBeerQuery = {
			id: '1',
		}

		jest.spyOn(beerModel, 'findOne').mockImplementation(() => ({
			lean: jest.fn().mockResolvedValue({
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
		}))

		await sut.execute(findBeerQuery)

		expect(beerModel.findOne).toHaveBeenCalledWith({ id: findBeerQuery.id })
	})
})
