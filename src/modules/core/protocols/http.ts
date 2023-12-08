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
