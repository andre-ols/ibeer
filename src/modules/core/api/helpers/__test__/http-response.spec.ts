import { UnauthorizedError } from '../../../errors/unauthorized'
import {
	badRequest,
	created,
	forbidden,
	internalError,
	noContent,
	notFound,
	ok,
	unauthorized,
} from '../http-response'

describe('HTTP Responses', () => {
	describe('badRequest', () => {
		test('should return a 400 response with error', () => {
			const error = new Error('Bad Request')
			const response = badRequest(error)

			expect(response.statusCode).toBe(400)
			expect(response.error).toBe(error)
			expect(response.data).toBeNull()
		})
	})

	describe('forbidden', () => {
		test('should return a 403 response with error', () => {
			const error = new Error('Forbidden')
			const response = forbidden(error)

			expect(response.statusCode).toBe(403)
			expect(response.error).toBe(error)
			expect(response.data).toBeNull()
		})
	})

	describe('unauthorized', () => {
		test('should return a 401 response with UnauthorizedError', () => {
			const response = unauthorized()

			expect(response.statusCode).toBe(401)
			expect(response.error).toBeInstanceOf(UnauthorizedError)
			expect(response.data).toBeNull()
		})
	})

	describe('internalError', () => {
		test('should return a 500 response with error', () => {
			const error = new Error('Internal Server Error')
			const response = internalError(error)

			expect(response.statusCode).toBe(500)
			expect(response.error).toBe(error)
			expect(response.data).toBeNull()
		})
	})

	describe('ok', () => {
		test('should return a 200 response with data', () => {
			const data = { message: 'Success' }
			const response = ok(data)

			expect(response.statusCode).toBe(200)
			expect(response.error).not.toBeDefined()
			expect(response.data).toBe(data)
		})
	})

	describe('notFound', () => {
		test('should return a 404 response with error', () => {
			const error = new Error('Not Found')
			const response = notFound(error)

			expect(response.statusCode).toBe(404)
			expect(response.error).toBe(error)
			expect(response.data).toBeNull()
		})
	})

	describe('noContent', () => {
		test('should return a 204 response with no data', () => {
			const response = noContent()

			expect(response.statusCode).toBe(204)
			expect(response.error).not.toBeDefined()
			expect(response.data).toBeNull()
		})
	})

	describe('created', () => {
		test('should return a 201 response with data', () => {
			const data = { id: 1, name: 'Created' }
			const response = created(data)

			expect(response.statusCode).toBe(201)
			expect(response.error).not.toBeDefined()
			expect(response.data).toBe(data)
		})
	})
})
