import { Abv } from '../abv'

describe('Abv', () => {
	it('should create a valid Abv instance', () => {
		const abv = new Abv(5)
		expect(abv).toBeTruthy()
	})

	it('should throw an error for invalid value', () => {
		expect(() => {
			new Abv(-1)
		}).toThrow()
	})
})
