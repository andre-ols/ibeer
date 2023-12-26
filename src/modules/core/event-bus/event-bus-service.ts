import { BaseEvent } from '.'

export interface IEventHandler<T extends BaseEvent> {
	// The function to handle the event.
	(event: T): void
}
export interface IEventBusSubscription<T extends BaseEvent> {
	new (...args: any[]): T // Type-safe reference to event constructor
}

export interface EventBusService {
	publish<T extends BaseEvent>(event: T): void
	subscribe<T extends BaseEvent>(
		eventClass: IEventBusSubscription<T>,
		handler: IEventHandler<T>,
	): void
	unsubscribe<T extends BaseEvent>(
		eventClass: IEventBusSubscription<T>,
		handler: IEventHandler<T>,
	): void
}
