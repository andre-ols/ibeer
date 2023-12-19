import { BeerBuilder } from '../../domain/model/beer'
import { CategoryBuilder } from '../../domain/model/category'
import { CreateBeerRepository } from '../../domain/repository/beer'
import { Abv } from '../../domain/value-object/abv'
import { Ebc } from '../../domain/value-object/ebc'
import { Ibu } from '../../domain/value-object/ibu'

export class CreateBeerCommand {
	name: string
	description: string
	imageUrl: string
	category: string
	abv: number
	ibu: number
	ebc: number
	foodPairing: string[]
	brewersTips: string

	constructor(params: CreateBeerCommand) {
		Object.assign(this, params)
	}
}

export interface CreateBeerHandler {
	execute(command: CreateBeerCommand): Promise<void>
}

export class CreateBeerHandlerImpl implements CreateBeerHandler {
	constructor(private readonly beerRepository: CreateBeerRepository) {}

	async execute(command: CreateBeerCommand) {
		const beer = new BeerBuilder()
			.withName(command.name)
			.withDescription(command.description)
			.withImageUrl(command.imageUrl)
			.withCategory(new CategoryBuilder().withName(command.category).build())
			.withAbv(new Abv(command.abv))
			.withIbu(new Ibu(command.ibu))
			.withEbc(new Ebc(command.ebc))
			.withFoodPairing(command.foodPairing)
			.withBrewersTips(command.brewersTips)
			.build()

		await this.beerRepository.execute(beer)
	}
}
