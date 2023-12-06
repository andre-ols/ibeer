import { NotFoundError } from '../not-found'

describe('NotFoundError', () => {
	test('should have the correct name and message', () => {
		const fieldName = 'productId'
		const error = new NotFoundError(fieldName)

		expect(error.name).toBe('NotFoundError')
		expect(error.message).toBe(`${fieldName} not found`)
		expect(error.field).toBe(fieldName)
	})

	test('should be an instance of Error', () => {
		const error = new NotFoundError('userId')

		expect(error).toBeInstanceOf(Error)
	})
})
