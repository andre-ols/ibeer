export type HttpResponse<T = unknown> = {
	data: T
	error?: Error
	statusCode: number
}
