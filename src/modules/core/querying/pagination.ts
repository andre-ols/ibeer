export class Pagination {
	private page: number
	private limit: number
	constructor({ page, limit }: { page?: number; limit?: number }) {
		this.page = page || 1
		this.limit = limit || 10
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
		this.limit = limit
	}

	setPage(page: number) {
		this.page = page
	}
}
