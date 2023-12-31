import { NotFoundError } from '@/modules/core/errors/not-found'
import { EventBus } from '@/modules/core/event-bus'
import { BeerBuilder } from '../../domain/aggregate/beer'
import { CategoryBuilder } from '../../domain/model/category'
import { CreateBeerRepository } from '../../domain/repository/beer'
import { Abv } from '../../domain/value-object/abv'
import { CreatedAt } from '../../domain/value-object/created-at'
import { Ebc } from '../../domain/value-object/ebc'
import { Ibu } from '../../domain/value-object/ibu'
import { UpdatedAt } from '../../domain/value-object/updated-at'
import { CreatedBeerEvent } from '../event/created-beer'
import { FindCategoryHandler } from '../query/find-category'

export class CreateBeerCommand {
	name: string
	description: string
	price: number
	imageUrl: string
	categoryId: string
	abv: number
	ibu: number
	ebc: number
	foodPairing: string[]
	brewersTips: string

	constructor(params: CreateBeerCommand) {
		Object.assign(this, params)
	}
}

export interface CreateBeerHandler {
	execute(command: CreateBeerCommand): Promise<void>
}

export class CreateBeerHandlerImpl implements CreateBeerHandler {
	constructor(
		private readonly beerRepository: CreateBeerRepository,
		private readonly findCategoryHandler: FindCategoryHandler,
		private readonly eventBus: EventBus,
	) {}

	async execute(command: CreateBeerCommand) {
		const category = await this.findCategoryHandler.execute({
			id: command.categoryId,
		})

		if (!category) {
			throw new NotFoundError('Category')
		}

		const beer = new BeerBuilder()
			.withName(command.name)
			.withDescription(command.description)
			.withImageUrl(command.imageUrl)
			.withPrice(command.price)
			.withCategory(
				new CategoryBuilder()
					.withId(category.id)
					.withName(category.name)
					.withCreatedAt(new CreatedAt(category.createdAt))
					.withUpdatedAt(new UpdatedAt(category.updatedAt))
					.build(),
			)
			.withAbv(new Abv(command.abv))
			.withIbu(new Ibu(command.ibu))
			.withEbc(new Ebc(command.ebc))
			.withFoodPairing(command.foodPairing)
			.withBrewersTips(command.brewersTips)
			.build()

		await this.beerRepository.execute(beer)

		const eventCreatedBeer = new CreatedBeerEvent(beer.toJSON())

		this.eventBus.publish(eventCreatedBeer)
	}
}
