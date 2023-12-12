import { randomUUID } from 'crypto'
import { InvalidError } from '../../../core/errors/invalid'

export class Beer {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly description: string,
		readonly imageUrl: string,
		readonly abv: number,
		readonly ibu: number,
		readonly ebc: number,
		readonly category: string,
		readonly foodPairing: string[],
		readonly brewersTips: string,
		readonly createdAt: Date,
		readonly updatedAt: Date,
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
		if (this.imageUrl.length < 1) {
			throw new InvalidError('imageUrl')
		}
		if (this.abv < 0) {
			throw new InvalidError('abv')
		}
		if (this.ibu < 0) {
			throw new InvalidError('ibu')
		}
		if (this.ebc < 0) {
			throw new InvalidError('ebc')
		}
		if (this.category.length < 1) {
			throw new InvalidError('category')
		}
		if (isNaN(this.createdAt.getTime())) {
			throw new InvalidError('createdAt')
		}
		if (this.createdAt.getTime() > Date.now()) {
			throw new InvalidError('createdAt')
		}
		if (this.createdAt.getTime() > this.updatedAt.getTime()) {
			throw new InvalidError('createdAt')
		}
		if (isNaN(this.updatedAt.getTime())) {
			throw new InvalidError('updatedAt')
		}
		if (this.updatedAt.getTime() > Date.now()) {
			throw new InvalidError('updatedAt')
		}
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			imageUrl: this.imageUrl,
			abv: this.abv,
			ibu: this.ibu,
			ebc: this.ebc,
			category: this.category,
			foodPairing: this.foodPairing,
			brewersTips: this.brewersTips,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		}
	}
}

export class BeerBuilder {
	private id: string
	private name: string
	private description: string
	private imageUrl: string
	private abv: number
	private ibu: number
	private ebc: number
	private category: string
	private foodPairing: string[]
	private brewersTips: string
	private createdAt: Date
	private updatedAt: Date

	constructor() {
		this.id = randomUUID()
		this.name = ''
		this.description = ''
		this.imageUrl = ''
		this.abv = 0
		this.ibu = 0
		this.ebc = 0
		this.category = ''
		this.foodPairing = []
		this.brewersTips = ''
		this.createdAt = new Date()
		this.updatedAt = new Date()
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

	withAbv(abv: number): BeerBuilder {
		this.abv = abv
		return this
	}

	withIbu(ibu: number): BeerBuilder {
		this.ibu = ibu
		return this
	}

	withEbc(ebc: number): BeerBuilder {
		this.ebc = ebc
		return this
	}

	withCategory(category: string): BeerBuilder {
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

	withCreatedAt(createdAt: Date): BeerBuilder {
		this.createdAt = createdAt
		return this
	}

	withUpdatedAt(updatedAt: Date): BeerBuilder {
		this.updatedAt = updatedAt
		return this
	}

	build(): Beer {
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
