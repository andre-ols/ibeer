import { CreateBeerRepository } from '../../../domain/repository/beer'
import { CreateBeerCommand, CreateBeerHandlerImpl } from '../create-beer'

const makeSut = () => {
	const createBeerRepository: CreateBeerRepository = {
		execute: jest.fn(),
	}

	jest.spyOn(createBeerRepository, 'execute').mockResolvedValueOnce({ id: '1' } as any)

	const sut = new CreateBeerHandlerImpl(createBeerRepository)

	return { sut, createBeerRepository }
}

describe('CreateBeerHandlerImpl', () => {
	test('should create a beer', async () => {
		const { sut, createBeerRepository } = makeSut()

		const beer = new CreateBeerCommand({
			name: 'Sample Beer',
			description: 'A sample beer description.',
			imageUrl: 'sample.jpg',
			category: 'Sample Category',
			abv: 1,
			ibu: 1,
			ebc: 1,
			foodPairing: ['Food 1', 'Food 2'],
			brewersTips: 'Some brewing tips.',
		})

		await sut.execute(beer)

		expect(createBeerRepository.execute).toHaveBeenCalled()
	})

	test('should return an error if Beer model is invalid', async () => {
		const { sut, createBeerRepository } = makeSut()

		const promise = sut.execute({
			name: '',
			description: '',
			imageUrl: '',
			category: '',
			abv: -1,
			ibu: -1,
			ebc: -1,
			foodPairing: [],
			brewersTips: '',
		})

		await expect(promise).rejects.toThrow()

		expect(createBeerRepository.execute).not.toHaveBeenCalled()
	})
})
