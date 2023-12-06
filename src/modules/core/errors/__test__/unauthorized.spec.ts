import { UnauthorizedError } from '../unauthorized'

describe('UnauthorizedError', () => {
	test('should have the correct name and message', () => {
		const error = new UnauthorizedError()

		expect(error.name).toBe('UnauthorizedError')
		expect(error.message).toBe('Unauthorized')
	})

	test('should be an instance of Error', () => {
		const error = new UnauthorizedError()

		expect(error).toBeInstanceOf(Error)
	})
})
