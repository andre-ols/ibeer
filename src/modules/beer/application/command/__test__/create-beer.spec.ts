import { CreateBeerRepository } from '../../../domain/repository/beer'
import { CreateBeerCommandImpl } from '../create-beer'

const makeSut = () => {
	const createBeerRepository: CreateBeerRepository = {
		execute: jest.fn(),
	}

	const sut = new CreateBeerCommandImpl(createBeerRepository)

	return { sut, createBeerRepository }
}

describe('CreateBeerCommandImpl', () => {
	it('should call createBeerRepository with correct params', async () => {
		const { sut, createBeerRepository } = makeSut()

		const params = {
			name: 'name',
			description: 'description',
			imageUrl: 'imageUrl',
			category: 'category',
			abv: 1,
			ibu: 2,
			ebc: 3,
			foodPairing: ['foodPairing'],
			brewersTips: 'brewersTips',
		}

		await sut.execute(params)

		expect(createBeerRepository.execute).toHaveBeenCalledWith({
			name: params.name,
			description: params.description,
			imageUrl: params.imageUrl,
			category: params.category,
			abv: params.abv,
			ibu: params.ibu,
			ebc: params.ebc,
			foodPairing: params.foodPairing,
			brewersTips: params.brewersTips,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		})
	})

	it('should throw if createBeerRepository throws', async () => {
		const { sut, createBeerRepository } = makeSut()

		jest.spyOn(createBeerRepository, 'execute').mockImplementationOnce(() => {
			throw new Error()
		})

		const params = {
			name: 'name',
			description: 'description',
			imageUrl: 'imageUrl',
			category: 'category',
			abv: 1,
			ibu: 2,
			ebc: 3,
			foodPairing: ['foodPairing'],
			brewersTips: 'brewersTips',
		}

		const promise = sut.execute(params)

		await expect(promise).rejects.toThrow()

		expect(createBeerRepository.execute).toHaveBeenCalledWith({
			name: params.name,
			description: params.description,
			imageUrl: params.imageUrl,
			category: params.category,
			abv: params.abv,
			ibu: params.ibu,
			ebc: params.ebc,
			foodPairing: params.foodPairing,
			brewersTips: params.brewersTips,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		})
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
