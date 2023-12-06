export class Pagination {
	private page: number
	private limit: number
	constructor() {
		this.page = 1
		this.limit = 10
	}

	getLimit() {
		return this.limit
	}

	getOffset() {
		return (this.page - 1) * this.limit
	}

	getPage() {
		return this.page
	}

	setLimit(limit: number) {
		if (limit < 10) {
			throw new Error('Limit must be greater than 10')
		}

		if (limit > 100) {
			throw new Error('Limit must be less than 100')
		}

		this.limit = limit
	}

	setPage(page: number) {
		if (page < 1) {
			throw new Error('Page must be greater than 1')
		}

		this.page = page
	}
}
