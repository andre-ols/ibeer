import { BaseEvent } from '@/modules/core/event-bus'

export class CreateProductEvent extends BaseEvent {
	constructor(readonly data: { id: string; price: number }) {
		super()
		this.setName('CreateProductEvent')
	}
}
