import { InvalidError } from '@/modules/core/errors/invalid'
import { CreatedAt } from '../../../beer/domain/value-object/created-at'
import { UpdatedAt } from '../../../beer/domain/value-object/updated-at'
import { Product } from '../model/product'
import { OrderStatus } from '../value-object/order-status'

export class Order {
	private price: number
	private status: OrderStatus
	private products: Product[]
	constructor(
		public readonly id: string,
		public readonly createdAt: CreatedAt,
		public readonly updatedAt: UpdatedAt,
	) {
		this.status = OrderStatus.PENDING
		this.price = 0
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

	addProduct(product: Product) {
		this.price += product.price
		this.products.push(product)
	}

	removeProduct(product: Product) {
		this.price -= product.price
		this.products = this.products.filter((p) => p.id !== product.id)
	}

	cancel() {
		this.status = OrderStatus.CANCELLED
	}

	pay() {
		this.status = OrderStatus.PAID
	}

	getStatus() {
		return this.status
	}
}

export class OrderBuilder {
	constructor(
		private id: string,
		private createdAt: CreatedAt,
		private updatedAt: UpdatedAt,
	) {}

	withId(id: string) {
		this.id = id
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
		return new Order(this.id, this.createdAt, this.updatedAt)
	}
}
