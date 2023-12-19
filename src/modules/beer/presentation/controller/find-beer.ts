import { ok } from '../../../core/api/helpers/http-response'
import { HttpResponse } from '../../../core/protocols/http'
import { FindBeerHandler } from '../../application/query/find-beer'

export interface FindBeerController {
	execute(request: FindBeerController.Request): Promise<FindBeerController.Result>
}

export namespace FindBeerController {
	export type Request = {
		params: {
			id: string
		}
	}

	export type Result = HttpResponse<{
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
	}>
}

export class FindBeerControllerImpl implements FindBeerController {
	constructor(private readonly findBeerHandler: FindBeerHandler) {}

	async execute(request: FindBeerController.Request): Promise<FindBeerController.Result> {
		const id = request.params.id

		const beer = await this.findBeerHandler.execute({
			id,
		})

		return ok(beer)
	}
}
