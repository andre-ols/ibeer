import { CreatedAt } from '../created-at'

describe('CreatedAt', () => {
	test('should create a valid CreatedAt instance', () => {
		const createdAt = new CreatedAt(new Date('2023-01-01'))
		expect(createdAt).toBeTruthy()
	})

	test('should throw an error for invalid value', () => {
		expect(() => {
			new CreatedAt(new Date('2050-01-01'))
		}).toThrow()
	})
})
