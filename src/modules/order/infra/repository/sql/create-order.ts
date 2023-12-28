import { PrismaClient } from '@prisma/client'
import { Order } from '../../../domain/aggregate/order'
import { CreateOrderRepository } from '../../../domain/repository/order'

export class CreateOrderSqlRepository implements CreateOrderRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async execute(order: Order): Promise<void> {
		await this.prismaClient.order.create({
			data: {
				id: order.id,
				price: order.getPrice(),
				status: order.getStatus(),
				createdAt: order.createdAt.getValue(),
				updatedAt: order.updatedAt.getValue(),

				Payment: {
					create: {
						id: order.payment.id,
						cardNumber: order.payment.cardNumber,
						holderName: order.payment.holderName,
						expirationDate: order.payment.expirationDate,
						cvv: order.payment.cvv,
						createdAt: order.payment.createdAt.getValue(),
						updatedAt: order.payment.updatedAt.getValue(),
					},
				},
				// many to many relation
				beers: {
					create: order.getBeers().map((beer) => ({
						quantity: beer.quantity,
						beer: {
							connect: {
								id: beer.id,
							},
						},
					})),
				},
			},
		})
	}
}
