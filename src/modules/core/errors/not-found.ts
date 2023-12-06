export class NotFoundError extends Error {
	constructor(public readonly field: string) {
		super(`${field} not found`)
		this.name = 'NotFoundError'
	}
}
