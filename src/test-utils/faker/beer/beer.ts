import { faker } from '@faker-js/faker'
import { BeerBuilder } from '../../../modules/beer/domain/aggregate/beer'
import { Abv } from '../../../modules/beer/domain/value-object/abv'
import { Ebc } from '../../../modules/beer/domain/value-object/ebc'
import { Ibu } from '../../../modules/beer/domain/value-object/ibu'
import { makeCategory } from './category'

export const makeBeer = () =>
	new BeerBuilder()
		.withName(faker.name.firstName())
		.withDescription(faker.lorem.paragraph())
		.withImageUrl(faker.image.url())
		.withCategory(makeCategory())
		.withAbv(
			new Abv(
				faker.number.int({
					min: 1,
					max: 10,
				}),
			),
		)
		.withIbu(
			new Ibu(
				faker.number.int({
					min: 1,
					max: 10,
				}),
			),
		)
		.withEbc(
			new Ebc(
				faker.number.int({
					min: 1,
					max: 10,
				}),
			),
		)
		.withFoodPairing([faker.lorem.word(), faker.lorem.word()])
		.withBrewersTips(faker.lorem.paragraph())
		.build()
