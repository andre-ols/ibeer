import { beers } from '@/data/beers'
import { randomUUID } from 'crypto'

export type DataBeer = {
	id: string
	name: string
	description: string
	imageUrl: string
	abv: number
	ibu: number
	ebc: number
	category: {
		id: string
		name: string
		createdAt: Date
		updatedAt: Date
	}
	foodPairing: string[]
	brewersTips: string
	createdAt: Date
	updatedAt: Date
}

export const dataBeer: Array<DataBeer> = beers
	.map((beer) => ({
		...beer,
		id: randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	}))
	.map((beer) => ({
		...beer,
		imageUrl: `http://localhost:3333/assets/${beer.name}/fg-image.png`,
	}))
	.map((beer) => ({
		...beer,
		category: {
			id: randomUUID(),
			name: beer.category,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	}))
