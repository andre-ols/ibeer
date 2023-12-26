import { BaseEvent } from './base-event'
import { IEventBusSubscription, IEventHandler } from './event-bus-service'

export class EventBus {
	private subscriptions: Map<IEventBusSubscription<BaseEvent>, IEventHandler<BaseEvent>[]> =
		new Map()

	/**
	 * Subscribe to an event class with a handler.
	 * @param eventClass The event class to subscribe to.
	 * @param handler The event handler function.
	 */
	subscribe<T extends BaseEvent>(
		eventClass: IEventBusSubscription<T>,
		handler: IEventHandler<T>,
	): void {
		if (this.subscriptions.has(eventClass)) {
			const subscriptions = this.subscriptions.get(eventClass)
			subscriptions?.push(handler)
		} else {
			this.subscriptions.set(eventClass, [handler])
		}
	}

	/**
	 * Unsubscribe from an event class with a handler.
	 * @param eventClass The event class to unsubscribe from.
	 * @param handler The event handler function.
	 */
	unsubscribe<T extends BaseEvent>(eventClass: { new (): T }, handler: IEventHandler<T>): void {
		const subscription = this.subscriptions.get(eventClass)

		if (!subscription) {
			throw new Error(`No subscription found for event ${eventClass.name}`)
		}

		const handlerIndex = subscription.indexOf(handler)

		if (handlerIndex === -1) {
			throw new Error('Handler not found')
		}

		subscription.splice(handlerIndex, 1)

		if (subscription.length === 0) {
			this.subscriptions.delete(eventClass)
		}
	}

	/**
	 * Publish an event instance.
	 * @param event The event instance to publish.
	 */
	publish<T extends BaseEvent>(event: T): void {
		const subscriptions = this.subscriptions.get(event.constructor as IEventBusSubscription<T>)

		if (!subscriptions) {
			return
		}

		subscriptions.forEach((handler) => handler(event))
	}
}

export const eventBus = new EventBus()
