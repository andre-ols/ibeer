import { AlreadyExistsError } from '../already-exists'

describe('AlreadyExistsError', () => {
	test('should have the correct name and message', () => {
		const fieldName = 'username'
		const error = new AlreadyExistsError(fieldName)

		expect(error.name).toBe('AlreadyExistsError')
		expect(error.message).toBe(`${fieldName} already exists`)
		expect(error.field).toBe(fieldName)
	})

	test('should be an instance of Error', () => {
		const error = new AlreadyExistsError('email')

		expect(error).toBeInstanceOf(Error)
	})
})
