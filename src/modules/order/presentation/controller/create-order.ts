import { HttpRequest, HttpResponse } from '@/modules/core/api/protocols/http'
import { created } from '../../../core/api/helpers/http-response'
import { CreateOrderCommand, CreateOrderHandler } from '../../application/command/create-order'

export interface CreateOrderController {
	execute(request: CreateOrderController.Request): Promise<CreateOrderController.Result>
}

export namespace CreateOrderController {
	export type Request = HttpRequest<
		{
			beers: Array<{
				id: string
				quantity: number
			}>
			payment: {
				cardNumber: string
				holderName: string
				expirationDate: string
				cvv: string
			}
		},
		undefined,
		undefined
	>

	export type Result = HttpResponse<void>
}

export class CreateOrderControllerImpl implements CreateOrderController {
	constructor(private readonly findBeerHandler: CreateOrderHandler) {}

	async execute(request: CreateOrderController.Request): Promise<CreateOrderController.Result> {
		const command = new CreateOrderCommand({
			payment: request.body.payment,
			beers: request.body.beers,
		})

		try {
			await this.findBeerHandler.execute(command)
		} catch (error) {
			console.log(error)
		}

		return created()
	}
}
