export class AlreadyExistsError extends Error {
	constructor(public readonly field: string) {
		super(`${field} already exists`)
		this.name = 'AlreadyExistsError'
	}
}
