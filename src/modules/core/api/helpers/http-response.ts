import { UnauthorizedError } from '../../errors/unauthorized'
import { HttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	error: error,
})

export const forbidden = (error: Error): HttpResponse => ({
	statusCode: 403,
	error: error,
})

export const unauthorized = (): HttpResponse => ({
	statusCode: 401,
	error: new UnauthorizedError(),
})

export const internalError = (error: Error): HttpResponse => ({
	statusCode: 500,
	error: error,
})

export const ok = <T>(
	data: T,
	metaData?: {
		page: number
		limit: number
		totalCount: number
	},
): HttpResponse<T> => ({
	statusCode: 200,
	data: data,
	metaData,
})

export const notFound = (error: Error): HttpResponse => ({
	statusCode: 404,
	error: error,
})

export const noContent = (): HttpResponse => ({
	statusCode: 204,
})

export const created = <T>(data: T): HttpResponse<T> => ({
	statusCode: 201,
	data: data,
})
