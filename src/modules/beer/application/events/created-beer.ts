import { BaseEvent } from '@/modules/core/event-bus'
import { Beer } from '../../domain/aggreagate/beer'

export class CreatedBeerEvent extends BaseEvent {
	constructor(beer: Beer) {
		super()
		this.setData(beer)
		this.setName('CreatedBeerEvent')
	}
}
