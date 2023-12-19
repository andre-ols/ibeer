import { FindBeerHandlerImpl } from '../find-beer'

const makeSut = () => {
	const findBeerRepository = {
		execute: jest.fn(),
	}

	const sut = new FindBeerHandlerImpl(findBeerRepository)

	return {
		sut,
		findBeerRepository,
	}
}

describe('FindBeerHandlerImpl', () => {
	test('should call findBeerRepository.execute with the correct parameters', async () => {
		const { sut, findBeerRepository } = makeSut()

		const findBeerQuery = {
			id: '1',
		}

		jest.spyOn(findBeerRepository, 'execute').mockResolvedValueOnce({
			toJSON: () => ({}),
		})

		await sut.execute(findBeerQuery)

		expect(findBeerRepository.execute).toHaveBeenCalledWith(findBeerQuery)
	})
})
