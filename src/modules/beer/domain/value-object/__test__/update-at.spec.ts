import { UpdatedAt } from '../updated-at'

describe('UpdatedAt', () => {
	test('should create a valid UpdatedAt instance', () => {
		const updatedAt = new UpdatedAt(new Date('2023-01-01'))
		expect(updatedAt).toBeTruthy()
	})

	test('should throw an error for invalid value', () => {
		expect(() => {
			new UpdatedAt(new Date('2050-01-01'))
		}).toThrow()
	})
})
