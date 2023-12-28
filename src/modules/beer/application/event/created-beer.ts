import { BeerModel } from '@/modules/core/db/nosql/mongo-client'
import { BaseEvent } from '@/modules/core/event-bus'

type Data = {
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

export class CreatedBeerEvent extends BaseEvent {
	constructor(readonly data: Data) {
		super()
		this.setName('CreatedBeerEvent')
	}
}

export interface CreatedBeerHandler {
	execute(event: CreatedBeerEvent): Promise<void>
}

export class CreatedBeerHandlerImpl implements CreatedBeerHandler {
	count = 0
	async execute(event: CreatedBeerEvent): Promise<void> {
		const { data } = event

		console.log('CreatedBeerHandlerImpl', data)

		console.log('CreatedBeerHandlerImpl', ++this.count)

		const beer = new BeerModel(data)

		await beer.save()
	}
}
