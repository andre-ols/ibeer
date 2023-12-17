import { InvalidError } from '../../../core/errors/invalid'

/**
 * @name Abv
 * @description Abv is responsible for the alcohol by volume of a beer
 * @param {number} value
 * @returns {Abv}
 * @example
 * const abv = new Abv(1)
 */
export class Abv {
	constructor(private value: number) {
		this.value = value
		this.validate()
	}
	validate() {
		if (this.value < 0) {
			throw new InvalidError('abv')
		}
	}
	getValue() {
		return this.value
	}
}
