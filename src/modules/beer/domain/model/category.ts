import { randomUUID } from 'crypto'
import { InvalidError } from '../../../core/errors/invalid'
import { CreatedAt } from '../value-object/created-at'
import { UpdatedAt } from '../value-object/updated-at'

/**
 * @class Category
 * @description Category is responsible for the category of a beer
 * @param {string} id
 * @param {string} name
 * @param {CreatedAt} createdAt
 * @param {UpdatedAt} updatedAt
 * @returns {Category}
 */
export class Category {
	constructor(
		private id: string,
		private name: string,
		private createdAt: CreatedAt,
		private updatedAt: UpdatedAt,
	) {
		this.validate()
	}

	validate() {
		if (!this.id) {
			throw new InvalidError('Category id')
		}

		if (this.name.length < 1) {
			throw new InvalidError('Category name')
		}

		if (this.createdAt.getValue() > this.updatedAt.getValue()) {
			throw new InvalidError('createdAt')
		}
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			createdAt: this.createdAt.getValue(),
			updatedAt: this.updatedAt.getValue(),
		}
	}
}

export class CategoryBuilder {
	private id: string
	private name?: string
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

	withName(name: string) {
		this.name = name
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
		if (!this.name) {
			throw new InvalidError('Category name is required')
		}
		return new Category(this.id, this.name, this.createdAt, this.updatedAt)
	}
}
