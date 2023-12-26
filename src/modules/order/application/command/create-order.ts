import { OrderBuilder } from '../../domain/aggregate/order'
import { Product } from '../../domain/model/product'
import { CreateOrderRepository } from '../../domain/repository/order'
import { FindProductRepository } from '../../domain/repository/product'

export class CreateOrderCommand {
	productIds: string[]

	constructor(params: CreateOrderCommand) {
		Object.assign(this, params)
	}
}

export interface CreateOrderHandler {
	execute(command: CreateOrderCommand): Promise<void>
}

export class CreateOrderHandlerImpl implements CreateOrderHandler {
	constructor(
		private readonly orderRepository: CreateOrderRepository,
		private readonly findProductRepository: FindProductRepository,
	) {}

	async execute(command: CreateOrderCommand) {
		// TODO: implement unit of work

		const products = await Promise.all(
			command.productIds.map((productId) => this.findProductRepository.execute(productId)),
		)

		const invalidProducts = products.filter((product) => !product)

		if (invalidProducts.length) {
			throw new Error('Invalid products found')
		}

		const order = new OrderBuilder().build()

		products.forEach((product) => order.addProduct(product as Product))

		// TODO: integrate with payment gateway

		await this.orderRepository.execute(order)
	}
}
