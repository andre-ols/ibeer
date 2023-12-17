import { InvalidError } from '../../../core/errors/invalid'

/**
 * @name Ibu
 * @description Ibu is responsible for the international bitterness unit of a beer
 * @param {number} value
 * @returns {Ibu}
 * @example
 * const ibu = new Ibu(1)
 */

export class Ibu {
	constructor(private value: number) {
		this.value = value
		this.validate()
	}
	validate() {
		if (this.value < 0) {
			throw new InvalidError('ibu')
		}
	}
	getValue() {
		return this.value
	}
}
