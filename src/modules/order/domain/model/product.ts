import { CreatedAt } from '@/modules/beer/domain/value-object/created-at'
import { UpdatedAt } from '@/modules/beer/domain/value-object/updated-at'
import { InvalidError } from '@/modules/core/errors/invalid'
import { randomUUID } from 'crypto'

export class Product {
	constructor(
		public readonly id: string,
		public readonly price: number,
		public readonly createdAt: CreatedAt,
		public readonly updatedAt: UpdatedAt,
	) {}

	validate() {
		if (!this.id) {
			throw new InvalidError('Product id is required')
		}

		if (this.price < 0) {
			throw new InvalidError('Product price is required')
		}

		if (this.createdAt.getValue() > this.updatedAt.getValue()) {
			throw new InvalidError('CreatedAt should be less than updatedAt')
		}
	}

	toJSON() {
		return {
			id: this.id,
			price: this.price,
			createdAt: this.createdAt.getValue(),
			updatedAt: this.updatedAt.getValue(),
		}
	}
}

export class ProductBuilder {
	private id: string
	private price?: number
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

	withPrice(price: number) {
		this.price = price
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
		if (!this.price) {
			throw new InvalidError('Product price is required')
		}

		return new Product(this.id, this.price, this.createdAt, this.updatedAt)
	}
}
