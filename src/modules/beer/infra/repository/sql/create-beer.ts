import { prismaClient } from '../../../../../db/prisma-client'
import { Beer } from '../../../domain/model/beer'
import { CreateBeerRepository } from '../../../domain/repository/beer'

export class CreateBeerSqlRepository implements CreateBeerRepository {
	async execute(beer: Beer): Promise<void> {
		await prismaClient.$transaction(async (tx) => {
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
	}
}
