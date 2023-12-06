import { BeerBuilder } from '../../domain/model/beer'
import { CreateBeerRepository } from '../../domain/repository/beer'

export interface CreateBeerCommand {
	execute(params: CreateBeerCommand.Params): Promise<CreateBeerCommand.Result>
}

export namespace CreateBeerCommand {
	export type Params = {
		name: string
		description: string
		imageUrl: string
		category: string
		abv: number
		ibu: number
		ebc: number
		foodPairing: string[]
		brewersTips: string
	}

	export type Result = {
		id: number
		name: string
		description: string
		imageUrl: string
		category: string
		abv: number
		ibu: number
		ebc: number
		foodPairing: string[]
		brewersTips: string
		createdAt: Date
		updatedAt: Date
	}
}

export class CreateBeerCommandImpl implements CreateBeerCommand {
	constructor(private readonly beerRepository: CreateBeerRepository) {}

	async execute(params: CreateBeerCommand.Params) {
		const beer = new BeerBuilder()
			.withName(params.name)
			.withDescription(params.description)
			.withImageUrl(params.imageUrl)
			.withCategory(params.category)
			.withAbv(params.abv)
			.withIbu(params.ibu)
			.withEbc(params.ebc)
			.withFoodPairing(params.foodPairing)
			.withBrewersTips(params.brewersTips)
			.build()

		return this.beerRepository.execute({
			name: beer.name,
			description: beer.description,
			imageUrl: beer.imageUrl,
			abv: beer.abv,
			ibu: beer.ibu,
			ebc: beer.ebc,
			foodPairing: beer.foodPairing,
			brewersTips: beer.brewersTips,
			category: beer.category,
			createdAt: beer.createdAt,
			updatedAt: beer.updatedAt,
		})
	}
}
