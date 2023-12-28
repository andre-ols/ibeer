// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpResponse<T = any> = {
	data?: T
	error?: Error
	statusCode: number
	metaData?: {
		page: number
		limit: number
		totalCount: number
	}
}

export type HttpRequest<T = any, K = any, Q = any> = {
	body: T
	params: K
	query: Q
}
