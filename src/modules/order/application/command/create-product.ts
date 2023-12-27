import { FindBeerHandler } from '@/modules/beer/application/query/find-beer'
import { NotFoundError } from '@/modules/core/errors/not-found'
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
