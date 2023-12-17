/**
 * @class CreatedAt
 * @description Value object that represents the date of creation of a beer
 * @param {Date} value
 * @returns {CreatedAt}
 * @example
 * const createdAt = new CreatedAt(new Date())
 */
export class CreatedAt {
	constructor(private value: Date) {
		this.validate()
	}

	validate() {
		if (isNaN(this.value.getTime())) {
			throw new Error('createdAt')
		}

		if (this.value.getTime() > Date.now()) {
			throw new Error('createdAt')
		}
	}

	getValue() {
		return this.value
	}
}
