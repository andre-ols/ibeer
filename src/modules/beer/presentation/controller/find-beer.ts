import { ok } from '../../../core/api/helpers/http-response'
import { HttpResponse } from '../../../core/protocols/http'
import { FindBeerQuery } from '../../application/query/find-beer'

export interface FindBeerController {
	execute(request: FindBeerController.Request): Promise<FindBeerController.Result>
}

export namespace FindBeerController {
	export type Request = {
		params: {
			id: number
		}
	}

	export type Result = HttpResponse<{
		id: number
		name: string
		description: string
		imageUrl: string
		abv: number
		ibu: number
		ebc: number
		category: string
		foodPairing: string[]
		brewersTips: string
		createdAt: Date
		updatedAt: Date
	}>
}

export class FindBeerControllerImpl implements FindBeerController {
	constructor(private readonly findBeerQuery: FindBeerQuery) {}

	async execute(request: FindBeerController.Request): Promise<FindBeerController.Result> {
		const id = request.params.id

		const options: FindBeerQuery.Params = { id }

		const beer = await this.findBeerQuery.execute(options)

		return ok(beer)
	}
}
