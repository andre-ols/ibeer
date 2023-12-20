import { CategoryBuilder } from '../../model/category'
import { Abv } from '../../value-object/abv'
import { CreatedAt } from '../../value-object/created-at'
import { Ebc } from '../../value-object/ebc'
import { Ibu } from '../../value-object/ibu'
import { UpdatedAt } from '../../value-object/updated-at'
import { BeerBuilder } from '../beer'

const makeSut = () => {
	const category = new CategoryBuilder().withName('Sample Category')
	const ebc = new Ebc(15)
	const ibu = new Ibu(10)
	const abv = new Abv(5)
	return {
		sut: new BeerBuilder().withCategory(category.build()).withEbc(ebc).withIbu(ibu).withAbv(abv),
	}
}

describe('Beer', () => {
	describe('constructor', () => {
		test('should create a valid Beer instance', () => {
			const { sut } = makeSut()
			const beer = sut
				.withName('Sample Beer')
				.withDescription('A sample beer description.')
				.withImageUrl('sample.jpg')
				.withFoodPairing(['Food 1', 'Food 2'])
				.withBrewersTips('Some brewing tips.')
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
				new BeerBuilder().withId('').build()
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

		test('should throw an error if createdAt is greater than updatedAt', () => {
			expect(() => {
				const { sut } = makeSut()
				sut
					.withCreatedAt(new CreatedAt(new Date('2022-01-01')))
					.withUpdatedAt(new UpdatedAt(new Date('2021-01-01')))
					.build()
			}).toThrow()
		})
	})
})
