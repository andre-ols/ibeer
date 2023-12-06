import { FindBeerQueryImpl } from '../find-beer'

const makeSut = () => {
	const findBeerRepository = {
		execute: jest.fn(),
	}

	const sut = new FindBeerQueryImpl(findBeerRepository)

	return {
		sut,
		findBeerRepository,
	}
}

describe('FindBeerQueryImpl', () => {
	test('should call findBeerRepository.execute with the correct parameters', async () => {
		const { sut, findBeerRepository } = makeSut()

		const params = {
			id: 1,
		}

		await sut.execute(params)

		expect(findBeerRepository.execute).toHaveBeenCalledWith(params)
	})
})
