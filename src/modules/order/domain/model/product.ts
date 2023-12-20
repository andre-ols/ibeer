import { Beer } from '@/modules/beer/domain/aggreagate/beer'
import { CreatedAt } from '@/modules/beer/domain/value-object/created-at'
import { UpdatedAt } from '@/modules/beer/domain/value-object/updated-at'
import { InvalidError } from '@/modules/core/errors/invalid'
import { randomUUID } from 'crypto'

export class Product {
	public price: number
	constructor(
		public readonly id: string,
		public beer: Beer,
		public readonly quantity: number,
		public readonly createdAt: CreatedAt,
		public readonly updatedAt: UpdatedAt,
	) {
		this.price = beer.price * quantity
	}

	validate() {
		if (!this.id) {
			throw new InvalidError('Product id is required')
		}

		if (this.quantity < 1) {
			throw new InvalidError('Product quantity is required')
		}

		if (this.createdAt.getValue() > this.updatedAt.getValue()) {
			throw new InvalidError('CreatedAt should be less than updatedAt')
		}
	}

	toJSON() {
		return {
			id: this.id,
			beer: this.beer.toJSON(),
			price: this.price,
			createdAt: this.createdAt.getValue(),
			updatedAt: this.updatedAt.getValue(),
		}
	}
}

export class ProductBuilder {
	private id: string
	private beer?: Beer
	private quantity?: number
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

	withBeer(beer: Beer) {
		this.beer = beer
		return this
	}

	withQuantity(quantity: number) {
		this.quantity = quantity
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
		if (!this.beer) {
			throw new InvalidError('Product beer is required')
		}
		if (!this.quantity) {
			throw new InvalidError('Product quantity is required')
		}
		return new Product(this.id, this.beer, this.quantity, this.createdAt, this.updatedAt)
	}
}
