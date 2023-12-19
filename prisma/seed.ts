import 'module-alias/register'

import { beers } from '@/data/beers'
import { categories } from '@/data/category'
import { CreateBeerHandlerImpl } from '@/modules/beer/application/command/create-beer'
import { FindCategoryHandlerImpl } from '@/modules/beer/application/query/find-category'
import { CreateBeerSqlRepository } from '@/modules/beer/infra/repository/sql/create-beer'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
const prisma = new PrismaClient()

async function saveCategory() {
	const data: {
		id: string
		name: string
		createdAt: Date
		updatedAt: Date
	}[] = []

	for await (const category of categories) {
		const formattedCategory = {
			id: randomUUID(),
			name: category.name,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		await prisma.category.create({
			data: formattedCategory,
		})
		data.push(formattedCategory)
	}

	return data
}

async function saveBeer() {
	const createdCategories = await saveCategory()

	const createBeerHandler = new CreateBeerHandlerImpl(
		new CreateBeerSqlRepository(prisma),
		new FindCategoryHandlerImpl(prisma),
	)

	const formattedBeers = beers.map((beer) => {
		const category = createdCategories.find((category) => category.name === beer.category)

		if (!category) {
			throw new Error('Category not found')
		}

		return {
			...beer,
			categoryId: category.id,
			imageUrl: `http://localhost:3333/assets/${beer.name}/fg-image.png`,
		}
	})

	formattedBeers.forEach(async (beer) => {
		await createBeerHandler.execute({
			name: beer.name,
			description: beer.description,
			imageUrl: beer.imageUrl,
			abv: beer.abv,
			ibu: beer.ibu,
			ebc: beer.ebc,
			foodPairing: beer.foodPairing,
			brewersTips: beer.brewersTips,
			categoryId: beer.categoryId,
		})
	})
}

async function main() {
	await saveBeer()
}

main()
