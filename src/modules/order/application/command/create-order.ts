import { FindBeerRepository } from '@/modules/beer/domain/repository/beer'
import { NotFoundError } from '@/modules/core/errors/not-found'
import { OrderBuilder } from '../../domain/aggregate/order'
import { PaymentBuilder } from '../../domain/model/payment'
import { CreateOrderRepository } from '../../domain/repository/order'

export class CreateOrderCommand {
	beers: Array<{
		id: string
		quantity: number
	}>
	payment: {
		cardNumber: string
		holderName: string
		expirationDate: string
		cvv: string
	}

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
		private readonly findBeerRepository: FindBeerRepository,
	) {}

	async execute(command: CreateOrderCommand) {
		// TODO: implement unit of work

		console.log('command', command)

		const beers = await Promise.all(
			command.beers.map((beer) => {
				return this.findBeerRepository.execute({
					id: beer.id,
				})
			}),
		)

		console.log('beers', beers)

		const invalidBeers = beers.filter((beer) => !beer)

		if (invalidBeers.length) {
			throw new NotFoundError(`Beer ${invalidBeers[0]!.id}`)
		}

		if (beers.length !== command.beers.length) {
			throw new Error('Invalid beers found')
		}

		const validBeers = beers.map((beer, index) => ({
			id: beer!.id,
			price: beer!.price,
			quantity: command.beers[index].quantity,
		}))

		const order = new OrderBuilder()
			.withPayment(
				new PaymentBuilder()
					.withCardNumber(command.payment.cardNumber)
					.withHolderName(command.payment.holderName)
					.withExpirationDate(command.payment.expirationDate)
					.withCvv(command.payment.cvv)
					.build(),
			)
			.build()

		validBeers.forEach((beer) => order.addBeer(beer.id, beer.price, beer.quantity))

		// TODO: integrate with payment gateway

		await this.orderRepository.execute(order)
	}
}
