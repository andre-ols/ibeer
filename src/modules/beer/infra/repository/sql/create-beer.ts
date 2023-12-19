import { prismaClient } from '../../../../../db/prisma-client'
import { Beer, BeerBuilder } from '../../../domain/model/beer'
import { CreateBeerRepository } from '../../../domain/repository/beer'
import { Abv } from '../../../domain/value-object/abv'
import { CreatedAt } from '../../../domain/value-object/created-at'
import { Ebc } from '../../../domain/value-object/ebc'
import { Ibu } from '../../../domain/value-object/ibu'
import { UpdatedAt } from '../../../domain/value-object/updated-at'

export class CreateBeerSqlRepository implements CreateBeerRepository {
	async execute(beer: Beer): Promise<Beer> {
		const createdBeer = await prismaClient.$transaction(async (tx) => {
			// create a beer and create or update a category

			await tx.category.upsert({
				where: {
					id: beer.category.id,
				},
				update: {
					name: beer.category.name,
					updatedAt: beer.category.updatedAt.getValue(),
				},
				create: {
					id: beer.category.id,
					name: beer.category.name,
					createdAt: beer.category.createdAt.getValue(),
					updatedAt: beer.category.updatedAt.getValue(),
				},
			})

			const dataBeer = tx.beer.create({
				data: {
					id: beer.id,
					name: beer.name,
					description: beer.description,
					imageUrl: beer.imageUrl,
					abv: beer.abv.getValue(),
					ibu: beer.ibu.getValue(),
					ebc: beer.ebc.getValue(),
					brewersTips: beer.brewersTips,
					createdAt: beer.createdAt.getValue(),
					updatedAt: beer.updatedAt.getValue(),
					foodPairing: beer.foodPairing,
					categoryId: beer.category.id,
				},
			})

			return dataBeer
		})

		return new BeerBuilder()
			.withId(createdBeer.id)
			.withName(createdBeer.name)
			.withDescription(createdBeer.description)
			.withImageUrl(createdBeer.imageUrl)
			.withAbv(new Abv(Number(createdBeer.abv)))
			.withIbu(new Ibu(createdBeer.ibu))
			.withEbc(new Ebc(createdBeer.ebc))
			.withBrewersTips(createdBeer.brewersTips)
			.withCreatedAt(new CreatedAt(createdBeer.createdAt))
			.withUpdatedAt(new UpdatedAt(createdBeer.updatedAt))
			.withFoodPairing(createdBeer.foodPairing)
			.withCategory(beer.category)
			.build()
	}
}
