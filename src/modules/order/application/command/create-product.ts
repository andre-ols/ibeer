import { FindBeerHandler } from '@/modules/beer/application/query/find-beer'
import { NotFoundError } from '@/modules/core/errors/not-found'
import { OnEvent } from '@/modules/core/event-bus'
import { CreateProductEvent } from '@/modules/order/application/events/created-beer'
import { ProductBuilder } from '../../domain/model/product'
import { CreateProductRepository } from '../../domain/repository/product'

export class CreateProductCommand {
	beerId: string
	price: number

	constructor(params: CreateProductCommand) {
		Object.assign(this, params)
	}
}

export interface CreateProductHandler {
	execute(command: CreateProductCommand): Promise<void>
}

export class CreateProductHandlerImpl implements CreateProductHandler {
	constructor(
		private readonly productRepository: CreateProductRepository,
		private readonly findBeerHandler: FindBeerHandler,
	) {}

	@OnEvent(CreateProductEvent)
	async onCreatedBeer(event: CreateProductEvent) {
		const product = new ProductBuilder().withId(event.data.id).withPrice(event.data.price).build()

		await this.productRepository.execute(product)
	}

	async execute(command: CreateProductCommand) {
		const beer = await this.findBeerHandler.execute({
			id: command.beerId,
		})

		if (!beer) {
			throw new NotFoundError('Beer')
		}

		const product = new ProductBuilder().withId(beer.id).withPrice(command.price).build()

		await this.productRepository.execute(product)
	}
}
