import { BaseEvent } from '@/modules/core/event-bus'
import { Beer } from '../../domain/aggregate/beer'

export class CreatedBeerEvent extends BaseEvent {
	constructor(readonly data: Beer) {
		super()
		this.setName('CreatedBeerEvent')
	}
}
