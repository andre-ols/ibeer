import { BaseEvent } from './base-event'

// create a decorator "OnEvent" is used to register a listener to an event.
export function OnEvent<T extends BaseEvent>(eventClass: { new (): T }) {
	return function (_: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value

		descriptor.value = function (...args: any[]) {
			const result = originalMethod.apply(this, args)

			const eventBus = new EventBus()
			eventBus.subscribe(eventClass, this[propertyKey])

			return result
		}
	}
}
