import { BeerBuilder } from '../beer'

const makeSut = () => {
	return {
		sut: new BeerBuilder(),
	}
}

describe('Beer', () => {
	describe('constructor', () => {
		test('should create a valid Beer instance', () => {
			const { sut } = makeSut()
			const beer = sut
				.withId(1)
				.withName('Sample Beer')
				.withDescription('A sample beer description.')
				.withImageUrl('sample.jpg')
				.withAbv(5.0)
				.withIbu(20)
				.withEbc(10)
				.withCategory('Sample Category')
				.withFoodPairing(['Food 1', 'Food 2'])
				.withBrewersTips('Some brewing tips.')
				.withCreatedAt(new Date('2023-01-01'))
				.withUpdatedAt(new Date('2023-01-01'))
				.build()

			expect(beer).toBeTruthy()
		})

		test('should throw an error for invalid parameters', () => {
			expect(() => {
				new BeerBuilder().build()
			}).toThrow()
		})

		test('should throw an error for invalid id', () => {
			expect(() => {
				new BeerBuilder().withId(-1).build()
			}).toThrow()
		})

		test('should throw an error for invalid name', () => {
			expect(() => {
				new BeerBuilder().withName('').build()
			}).toThrow()
		})

		test('should throw an error for invalid description', () => {
			expect(() => {
				new BeerBuilder().withDescription('').build()
			}).toThrow()
		})

		test('should throw an error for invalid imageUrl', () => {
			expect(() => {
				new BeerBuilder().withImageUrl('').build()
			}).toThrow()
		})

		test('should throw an error for invalid abv', () => {
			expect(() => {
				new BeerBuilder().withAbv(-1).build()
			}).toThrow()
		})

		test('should throw an error for invalid ibu', () => {
			expect(() => {
				new BeerBuilder().withIbu(-1).build()
			}).toThrow()
		})

		test('should throw an error for invalid ebc', () => {
			expect(() => {
				new BeerBuilder().withEbc(-1).build()
			}).toThrow()
		})

		test('should throw an error for invalid category', () => {
			expect(() => {
				new BeerBuilder().withCategory('').build()
			}).toThrow()
		})

		test('should throw an error for invalid foodPairing', () => {
			expect(() => {
				new BeerBuilder().withFoodPairing([]).build()
			}).toThrow()
		})

		test('should throw an error for invalid brewersTips', () => {
			expect(() => {
				new BeerBuilder().withBrewersTips('').build()
			}).toThrow()
		})

		test('should throw an error for invalid createdAt', () => {
			expect(() => {
				new BeerBuilder().withCreatedAt(new Date('1990-01-01')).build()
			}).toThrow()
		})

		test('should throw an error if createdAt is greater than updatedAt', () => {
			expect(() => {
				new BeerBuilder()
					.withCreatedAt(new Date('2023-01-01'))
					.withUpdatedAt(new Date('2022-01-01'))
					.build()
			}).toThrow()
		})

		test('should throw an error for invalid updatedAt', () => {
			expect(() => {
				new BeerBuilder().withUpdatedAt(new Date('1990-01-01')).build()
			}).toThrow()
		})
	})
})
