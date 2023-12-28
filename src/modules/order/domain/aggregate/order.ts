import { InvalidError } from '@/modules/core/errors/invalid'
import { randomUUID } from 'crypto'
import { CreatedAt } from '../../../beer/domain/value-object/created-at'
import { UpdatedAt } from '../../../beer/domain/value-object/updated-at'
import { Payment } from '../model/payment'
import { StatusOrder } from '../value-object/order-status'

export class Order {
	private price: number
	private status: StatusOrder
	private beers: {
		id: string
		unitPrice: number
		quantity: number
	}[]
	constructor(
		public readonly id: string,
		public readonly payment: Payment,
		public readonly createdAt: CreatedAt,
		public readonly updatedAt: UpdatedAt,
	) {
		this.status = StatusOrder.PENDING
		this.price = 0
		this.beers = []
		this.validate()
	}

	validate() {
		if (!this.id) {
			throw new InvalidError('id')
		}

		if (this.createdAt.getValue() > this.updatedAt.getValue()) {
			throw new InvalidError('createdAt')
		}
	}

	addBeer(id: string, unitPrice: number, quantity: number) {
		this.price += unitPrice * quantity
		this.beers.push({ id, unitPrice, quantity })
	}

	removeBeer(id: string) {
		const beer = this.beers.find((beer) => beer.id === id)
		if (!beer) {
			throw new Error('Beer not found')
		}
		this.price -= beer.unitPrice * beer.quantity
		this.beers = this.beers.filter((beer) => beer.id !== id)
	}

	cancel() {
		this.status = StatusOrder.CANCELLED
	}

	pay() {
		this.status = StatusOrder.PAID
	}

	getStatus() {
		return this.status
	}

	getPrice() {
		return this.price
	}

	getBeers() {
		return this.beers
	}
}

export class OrderBuilder {
	private id: string
	private payment: Payment
	private createdAt: CreatedAt
	private updatedAt: UpdatedAt

	constructor() {
		this.id = randomUUID()
		this.createdAt = new CreatedAt(new Date())
		this.updatedAt = new UpdatedAt(new Date())
	}

	withId(id: string) {
		this.id = id
		return this
	}

	withPayment(payment: Payment) {
		this.payment = payment
		return this
	}

	withCreatedAt(createdAt: CreatedAt) {
		this.createdAt = createdAt
		return this
	}

	withUpdatedAt(updatedAt: UpdatedAt) {
		this.updatedAt = updatedAt
		return this
	}

	build() {
		if (!this.payment) {
			throw new InvalidError('payment')
		}
		return new Order(this.id, this.payment, this.createdAt, this.updatedAt)
	}
}
