import { Ibu } from '../ibu'

describe('Ibu', () => {
	it('should create a valid Ibu instance', () => {
		const ibu = new Ibu(5)
		expect(ibu).toBeTruthy()
	})
	it('should throw an error for invalid value', () => {
		expect(() => {
			new Ibu(-1)
		}).toThrow()
	})
})
