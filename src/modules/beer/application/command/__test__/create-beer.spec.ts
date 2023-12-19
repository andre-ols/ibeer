import { CreateBeerRepository } from '../../../domain/repository/beer'
import { CreateBeerCommand, CreateBeerHandlerImpl } from '../create-beer'

const makeSut = () => {
	const createBeerRepository: CreateBeerRepository = {
		execute: jest.fn(),
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	jest.spyOn(createBeerRepository, 'execute').mockResolvedValueOnce({ id: '1' } as any)

	const findCategoryHandler = {
		execute: jest.fn(),
	}

	const sut = new CreateBeerHandlerImpl(createBeerRepository, findCategoryHandler)

	return { sut, createBeerRepository, findCategoryHandler }
}

describe('CreateBeerHandlerImpl', () => {
	test('should create a beer', async () => {
		const { sut, createBeerRepository, findCategoryHandler } = makeSut()

		const beer = new CreateBeerCommand({
			name: 'Sample Beer',
			description: 'A sample beer description.',
			imageUrl: 'sample.jpg',
			categoryId: '1',
			abv: 1,
			ibu: 1,
			ebc: 1,
			foodPairing: ['Food 1', 'Food 2'],
			brewersTips: 'Some brewing tips.',
		})

		jest.spyOn(findCategoryHandler, 'execute').mockResolvedValueOnce({
			id: '1',
			name: 'Sample Category',
			createdAt: new Date('2023-01-01'),
			updatedAt: new Date('2023-01-01'),
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
			categoryId: '1',
			abv: -1,
			ibu: -1,
			ebc: -1,
			foodPairing: [],
			brewersTips: '',
		})

		await expect(promise).rejects.toThrow()

		expect(createBeerRepository.execute).not.toHaveBeenCalled()
	})

	test('should return an error if Category is not found', async () => {
		const { sut, createBeerRepository, findCategoryHandler } = makeSut()

		const beer = new CreateBeerCommand({
			name: 'Sample Beer',
			description: 'A sample beer description.',
			imageUrl: 'sample.jpg',
			categoryId: '1',
			abv: 1,
			ibu: 1,
			ebc: 1,
			foodPairing: ['Food 1', 'Food 2'],
			brewersTips: 'Some brewing tips.',
		})

		jest.spyOn(findCategoryHandler, 'execute').mockResolvedValueOnce(null)

		const promise = sut.execute(beer)

		await expect(promise).rejects.toThrow()

		expect(createBeerRepository.execute).not.toHaveBeenCalled()

		expect(findCategoryHandler.execute).toHaveBeenCalled()
	})
})
