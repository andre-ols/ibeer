import { randomUUID } from 'crypto'
import { InvalidError } from '../../../core/errors/invalid'
import { Category } from '../model/category'
import { Abv } from '../value-object/abv'
import { CreatedAt } from '../value-object/created-at'
import { Ebc } from '../value-object/ebc'
import { Ibu } from '../value-object/ibu'
import { UpdatedAt } from '../value-object/updated-at'

export class Beer {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly description: string,
		readonly imageUrl: string,
		readonly abv: Abv,
		readonly ibu: Ibu,
		readonly ebc: Ebc,
		readonly category: Category,
		readonly foodPairing: string[],
		readonly brewersTips: string,
		readonly createdAt: CreatedAt,
		readonly updatedAt: UpdatedAt,
	) {
		this.validate()
	}

	private validate() {
		if (!this.id) {
			throw new InvalidError('id')
		}
		if (this.name.length < 1) {
			throw new InvalidError('name')
		}
		if (this.description.length < 1) {
			throw new InvalidError('description')
		}
		;[]
		if (this.imageUrl.length < 1) {
			throw new InvalidError('imageUrl')
		}
		if (this.createdAt.getValue() > this.updatedAt.getValue()) {
			throw new InvalidError('createdAt')
		}
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			imageUrl: this.imageUrl,
			abv: this.abv.getValue(),
			ibu: this.ibu.getValue(),
			ebc: this.ebc.getValue(),
			category: this.category.toJSON(),
			foodPairing: this.foodPairing,
			brewersTips: this.brewersTips,
			createdAt: this.createdAt.getValue(),
			updatedAt: this.updatedAt.getValue(),
		}
	}
}

export class BeerBuilder {
	private id: string
	private name?: string
	private description?: string
	private imageUrl?: string
	private abv?: Abv
	private ibu?: Ibu
	private ebc?: Ebc
	private category?: Category
	private foodPairing?: string[]
	private brewersTips?: string
	private createdAt: CreatedAt
	private updatedAt: UpdatedAt

	constructor() {
		this.id = randomUUID()
		this.createdAt = new CreatedAt(new Date())
		this.updatedAt = new UpdatedAt(new Date())
	}

	withId(id: string): BeerBuilder {
		this.id = id
		return this
	}

	withName(name: string): BeerBuilder {
		this.name = name
		return this
	}

	withDescription(description: string): BeerBuilder {
		this.description = description
		return this
	}

	withImageUrl(imageUrl: string): BeerBuilder {
		this.imageUrl = imageUrl
		return this
	}

	withAbv(abv: Abv): BeerBuilder {
		this.abv = abv
		return this
	}

	withIbu(ibu: Ibu): BeerBuilder {
		this.ibu = ibu
		return this
	}

	withEbc(ebc: Ebc): BeerBuilder {
		this.ebc = ebc
		return this
	}

	withCategory(category: Category): BeerBuilder {
		this.category = category
		return this
	}

	withFoodPairing(foodPairing: string[]): BeerBuilder {
		this.foodPairing = foodPairing
		return this
	}

	withBrewersTips(brewersTips: string): BeerBuilder {
		this.brewersTips = brewersTips
		return this
	}

	withCreatedAt(createdAt: CreatedAt): BeerBuilder {
		this.createdAt = createdAt
		return this
	}

	withUpdatedAt(updatedAt: UpdatedAt): BeerBuilder {
		this.updatedAt = updatedAt
		return this
	}

	build(): Beer {
		if (!this.name) throw new InvalidError('Beer Name is required')
		if (!this.description) throw new InvalidError('Beer Description is required')

		if (!this.imageUrl) throw new InvalidError('Beer Image Url is required')
		if (!this.abv) throw new InvalidError('Beer Abv is required')
		if (!this.ibu) throw new InvalidError('Beer Ibu is required')
		if (!this.ebc) throw new InvalidError('Beer Ebc is required')
		if (!this.category) throw new InvalidError('Beer Category is required')
		if (!this.foodPairing) throw new InvalidError('Beer Food Pairing is required')
		if (!this.brewersTips) throw new InvalidError('Beer Brewers Tips is required')

		return new Beer(
			this.id,
			this.name,
			this.description,
			this.imageUrl,
			this.abv,
			this.ibu,
			this.ebc,
			this.category,
			this.foodPairing,
			this.brewersTips,
			this.createdAt,
			this.updatedAt,
		)
	}
}
