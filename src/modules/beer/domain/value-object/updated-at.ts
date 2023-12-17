/**
 * @class UpdatedAt
 * @description Value object that represents the date of creation of a beer
 * @param {Date} value
 * @returns {UpdatedAt}
 * @example
 * const updatedAt = new UpdatedAt(new Date())
 */
export class UpdatedAt {
	constructor(private value: Date) {
		this.validate()
	}

	validate() {
		if (isNaN(this.value.getTime())) {
			throw new Error('updatedAt')
		}

		if (this.value.getTime() > Date.now()) {
			throw new Error('updatedAt')
		}
	}

	getValue() {
		return this.value
	}
}
