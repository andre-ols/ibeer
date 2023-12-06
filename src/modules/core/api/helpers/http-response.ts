import { UnauthorizedError } from '../../errors/unauthorized'
import { HttpResponse } from '../../protocols/http'

export const badRequest = <T>(error: Error): HttpResponse<T> => ({
	statusCode: 400,
	error: error,
	data: null,
})

export const forbidden = <T>(error: Error): HttpResponse<T> => ({
	statusCode: 403,
	error: error,
	data: null,
})

export const unauthorized = (): HttpResponse => ({
	statusCode: 401,
	error: new UnauthorizedError(),
	data: null,
})

export const internalError = <T>(error: Error): HttpResponse<T> => ({
	statusCode: 500,
	error: error,
	data: null,
})

export const ok = <T>(data: T): HttpResponse<T> => ({
	statusCode: 200,
	data: data,
})

export const notFound = <T>(error: Error): HttpResponse<T> => ({
	statusCode: 404,
	error: error,
	data: null,
})

export const noContent = (): HttpResponse => ({
	statusCode: 204,
	data: null,
})
export const created = <T>(data: T): HttpResponse<T> => ({
	statusCode: 201,
	data: data,
})
