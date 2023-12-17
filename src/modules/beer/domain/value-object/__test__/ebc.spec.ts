import { Ebc } from '../ebc'

describe('Ebc', () => {
	it('should create a valid Ebc instance', () => {
		const ebc = new Ebc(5)
		expect(ebc).toBeTruthy()
	})
	it('should throw an error for invalid value', () => {
		expect(() => {
			new Ebc(-1)
		}).toThrow()
	})
})
