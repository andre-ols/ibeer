import { InternalError } from '../internal'

describe('InternalError', () => {
	test('should have the correct name and message', () => {
		const errorKind = 'Server malfunction'
		const error = new InternalError(errorKind)

		expect(error.name).toBe('InternalError')
		expect(error.message).toBe(errorKind)
	})

	test('should be an instance of Error', () => {
		const error = new InternalError('Database error')

		expect(error).toBeInstanceOf(Error)
	})
})
