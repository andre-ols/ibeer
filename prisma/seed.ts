import 'module-alias/register'

import { beers } from '@/data/beers'
import { categories } from '@/data/category'
import { CreateBeerHandlerImpl } from '@/modules/beer/application/command/create-beer'
import {
	CreatedBeerEvent,
	CreatedBeerHandlerImpl,
} from '@/modules/beer/application/event/created-beer'
import { FindCategoryHandlerImpl } from '@/modules/beer/application/query/find-category'
import { CreateBeerSqlRepository } from '@/modules/beer/infra/repository/sql/create-beer'
import { eventBus } from '@/modules/core/event-bus'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
const prisma = new PrismaClient()

console.log('Seeding...')

const eventHandler = new CreatedBeerHandlerImpl()

eventBus.subscribe(CreatedBeerEvent, (event) => eventHandler.execute(event))

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
		eventBus,
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

	for await (const beer of formattedBeers) {
		await createBeerHandler.execute({
			name: beer.name,
			description: beer.description,
			price: beer.price,
			imageUrl: beer.imageUrl,
			abv: beer.abv,
			ibu: beer.ibu,
			ebc: beer.ebc,
			foodPairing: beer.foodPairing,
			brewersTips: beer.brewersTips,
			categoryId: beer.categoryId,
		})
	}
}

async function main() {
	await saveBeer()
	console.log('Seeding finished!')
}

main()
