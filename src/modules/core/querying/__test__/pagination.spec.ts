import { Pagination } from '../pagination'

const makeSut = () => {
	return {
		sut: new Pagination(),
	}
}

describe('Pagination', () => {
	describe('constructor', () => {
		test('should initialize with default values', () => {
			const { sut } = makeSut()

			expect(sut.getPage()).toBe(1)
			expect(sut.getLimit()).toBe(10)
		})
	})

	describe('getOffset', () => {
		test('should calculate the correct offset', () => {
			const { sut } = makeSut()
			sut.setPage(3)
			sut.setLimit(20)

			expect(sut.getOffset()).toBe(40) // (3 - 1) * 20
		})
	})

	describe('setLimit', () => {
		test('should set a valid limit', () => {
			const { sut } = makeSut()
			sut.setLimit(50)

			expect(sut.getLimit()).toBe(50)
		})

		test('should throw an error for a limit less than 10', () => {
			const { sut } = makeSut()

			expect(() => sut.setLimit(5)).toThrow('Limit must be greater than 10')
		})

		test('should throw an error for a limit greater than 100', () => {
			const { sut } = makeSut()

			expect(() => sut.setLimit(150)).toThrow('Limit must be less than 100')
		})
	})

	describe('setPage', () => {
		test('should set a valid page', () => {
			const { sut } = makeSut()
			sut.setPage(2)

			expect(sut.getPage()).toBe(2)
		})

		test('should throw an error for a page less than 1', () => {
			const { sut } = makeSut()

			expect(() => sut.setPage(0)).toThrow('Page must be greater than 1')
		})
	})
})
