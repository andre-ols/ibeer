/**
 * @class Ebc
 * @description Ebc is responsible for the european brewery convention of a beer
 * @param {number} value
 * @returns {Ebc}
 * @example
 * const ebc = Ebc.create(1)
 * ebc.getValue() // 1
 */

import { InvalidError } from '../../../core/errors/invalid'

/**
 * @class Ebc
 * @description Ebc is responsible for the european brewery convention of a beer
 * @param {number} value
 * @returns {Ebc}
 * @example
 * const ebc = new Ebc(1)
 */
export class Ebc {
	constructor(private value: number) {
		this.value = value
		this.validate()
	}

	validate() {
		if (this.value < 0) {
			throw new InvalidError('ebc')
		}
	}

	getValue() {
		return this.value
	}
}
