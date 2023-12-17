import { CreatedAt } from '../../value-object/created-at'
import { UpdatedAt } from '../../value-object/updated-at'
import { CategoryBuilder } from '../category'

const makeSut = () => {
	const sut = new CategoryBuilder()
	return { sut }
}

describe('Category', () => {
	describe('constructor', () => {
		test('should create a valid Category instance', () => {
			const { sut } = makeSut()
			const category = sut
				.withName('Sample Category')
				.withCreatedAt(new CreatedAt(new Date('2023-01-01')))
				.withUpdatedAt(new UpdatedAt(new Date('2023-01-01')))
				.build()

			expect(category).toBeTruthy()
		})

		test('should throw an error for invalid parameters', () => {
			expect(() => {
				new CategoryBuilder().build()
			}).toThrow()
		})

		test('should throw an error for invalid id', () => {
			expect(() => {
				new CategoryBuilder().withId('').build()
			}).toThrow()
		})

		test('should throw an error for invalid name', () => {
			expect(() => {
				new CategoryBuilder().withName('').build()
			}).toThrow()
		})
	})

	describe('toJSON', () => {
		test('should return a valid JSON', () => {
			const { sut } = makeSut()
			const category = sut
				.withName('Sample Category')
				.withCreatedAt(new CreatedAt(new Date('2023-01-01')))
				.withUpdatedAt(new UpdatedAt(new Date('2023-01-01')))
				.build()

			const json = category.toJSON()

			expect(json).toEqual({
				id: expect.any(String),
				name: 'Sample Category',
				createdAt: new Date('2023-01-01'),
				updatedAt: new Date('2023-01-01'),
			})
		})
	})
})
