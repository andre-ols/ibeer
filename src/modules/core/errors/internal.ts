export class InternalError extends Error {
	constructor(kind: string) {
		super(kind)
		this.name = 'InternalError'
	}
}
